---
title: "End-to-End Live Demo Verification"
date: 2026-11-26
weight: 4
chapter: false
pre: " <b> 5.4.4 </b> "
---

Once CloudFront and ALB health checks show `Healthy`, open `https://medimind.yourdomain.com` (or `http://localhost:8000` for local Docker verification) and verify all **5 clinical end-to-end demo scenarios**.

#### Step 1: Multi-Channel Authentication (`Flow 7a, 7b, 8`)

Verify account registration, 6-digit OTP delivery, and Google OAuth 2.0 login:
- **Email/Phone Registration & OTP:** Register via `POST /api/auth/register` or request an OTP code via `POST /api/auth/otp/send` (routed through Gmail SMTP `smtp.gmail.com:587` or SpeedSMS via the NAT Gateway) and confirm with `POST /api/auth/otp/verify`.
- **Google OAuth 2.0:** Click **Sign in with Google** (`GET /api/auth/google/login` -> Google Consent Screen -> `/api/auth/google/callback`) and confirm user persistence in Amazon RDS PostgreSQL (`users` table).

#### Step 2: Clinical Triage, Negation Trap & Grounded RAG (`POST /api/chat`)

Test both emergency bypass and negation handling against `core/triage.py` and `core/rag_service.py`:

```bash
# Case 1 — Red Flag Emergency Bypass (Expected: Red tier, 115 alert, immediate bypass)
curl -s -X POST https://medimind.yourdomain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tôi đau thắt ngực dữ dội, vã mồ hôi và khó thở lan ra cánh tay trái", "history": []}' | jq .

# Case 2 — Negation Trap & Grounded RAG (Expected: NOT emergency, ENT routing, real ChromaDB citations)
curl -s -X POST https://medimind.yourdomain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tôi bị đau rát họng, sốt nhẹ 38 độ từ hôm qua nhưng không khó thở, không đau ngực", "history": []}' | jq .
```

- **Expected Case 1 Output:** `risk_level: "red"`, immediate **Emergency 115** guidance without delaying for multi-turn intake.
- **Expected Case 2 Output:** Negation parser recognizes *"không khó thở, không đau ngực"* (zero false emergency alarm), recommends ENT (*Tai Mũi Họng*), and attaches verified citations retrieved from the **364 ChromaDB clinical documents** (*MoH / kcb.vn / MedlinePlus NIH*).

#### Step 3: 8-Step Parallel OCR Cross-Verification (`POST /api/prescription/scan`)

Upload a prescription or biochemistry lab photo via the Web SPA or `POST /api/prescription/scan` / `POST /api/upload-lab` and verify the 8-step orchestrator (`core/pipeline_orchestrator.py`):

| Step | Stage Name | Verified Behavior |
| :---: | :--- | :--- |
| `[0]` | **Intake & Quality Check** | Detects blur, low brightness, glare, and optionally masks PII on image. |
| `[1]` | **Lightweight Preprocessing** | Retains original pass + deskew/perspective crop + conditional CLAHE. |
| `[2]` | **Parallel Dual Extraction** | Executes **EasyOCR** (`core/ocr_parallel_service.py`) and **Vision LLM** (`nvidia/nemotron-3.5-super-vl:free`) in parallel. |
| `[3]` | **Field-by-Field Reconciliation** | Compares both outputs; sets `needs_review=True` if drug names, dosages, or lab metrics diverge. |
| `[4]` | **Deterministic Grounding** | Normalizes drug entities, units, and schedule buckets (*Morning – Noon – Afternoon – Evening*). |
| `[5]` | **Clinical Rules Validation** | Flags High/Low lab values, drug interactions, and patient allergy contraindications. |
| `[6]` | **AI Interpretation** | Summarizes only the validated JSON fields (no ungrounded hallucination). |
| `[7]` | **Human-in-the-Loop Confirm** | User reviews and confirms via `POST /api/prescription/confirm` before saving to `prescription_history`. |

#### Step 4: Clinical Nutrition Studio (`POST /api/nutrition/analyze`)

Submit a clinical condition and allergy constraint (e.g., *"Đau dạ dày, không cay, dị ứng hải sản"*):
- `core/nutrition_rules.py` executes deterministic **Fail-Closed Allergy Filtering** across **2,462 ViFoodRec recipes** (2,367 dishes + 95 drinks).
- `core/nutrition_ai.py` ranks up to **6 safe dishes** while strictly locking dish names, ingredients, and `kcal` values to the verified catalog.

#### Step 5: 30-Second Pre-Consultation Summary & Facility Booking (`Flow 9`)

1. Start and confirm a structured intake session (`POST /api/intake/session` -> `POST /api/intake/message` -> `POST /api/intake/confirm-summary`) to generate the 30-second **Pre-Consultation Summary** (HPI, chief complaint, allergies, active medications).
2. Query the **2,144 healthcare facilities** (1,505 in HCMC + 639 in Hanoi) and book an appointment:

```bash
curl -s "https://medimind.yourdomain.com/api/facilities?city=TP.HCM&limit=5" | jq .
curl -s "https://medimind.yourdomain.com/api/facilities/map-markers?city=Ha%20Noi" | jq '.[0:3]'
```
