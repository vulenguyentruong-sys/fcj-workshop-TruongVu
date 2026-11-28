/* Repository-only report reader. Browser report storage is intentionally never read or deleted. */
'use strict';
const reportPaths = ["content/_index.md", "content/_index.vi.md", "content/1-Worklog/_index.md", "content/1-Worklog/_index.vi.md", "content/2-Proposal/_index.md", "content/2-Proposal/_index.vi.md", "content/3-BlogsPosted/_index.md", "content/3-BlogsPosted/_index.vi.md", "content/4-EventParticipated/_index.md", "content/4-EventParticipated/_index.vi.md", "content/5-Workshop/_index.md", "content/5-Workshop/_index.vi.md", "content/6-Self-evaluation/_index.md", "content/6-Self-evaluation/_index.vi.md", "content/7-Feedback/_index.md", "content/7-Feedback/_index.vi.md", "content/5-Workshop/5.1-Workshop-overview/_index.md", "content/5-Workshop/5.1-Workshop-overview/_index.vi.md", "content/5-Workshop/5.2-Prerequisite/_index.md", "content/5-Workshop/5.2-Prerequisite/_index.vi.md", "content/5-Workshop/5.3-AWS-Infrastructure/_index.md", "content/5-Workshop/5.3-AWS-Infrastructure/_index.vi.md", "content/5-Workshop/5.4-Deploy-MediMind/_index.md", "content/5-Workshop/5.4-Deploy-MediMind/_index.vi.md", "content/5-Workshop/5.5-Operations/_index.md", "content/5-Workshop/5.5-Operations/_index.vi.md", "content/5-Workshop/5.6-Cleanup/_index.md", "content/5-Workshop/5.6-Cleanup/_index.vi.md", "content/4-EventParticipated/4.1-Event1/_index.md", "content/4-EventParticipated/4.1-Event1/_index.vi.md", "content/4-EventParticipated/4.2-Event2/_index.md", "content/4-EventParticipated/4.2-Event2/_index.vi.md", "content/4-EventParticipated/4.3-Event3/_index.md", "content/4-EventParticipated/4.3-Event3/_index.vi.md", "content/4-EventParticipated/4.4-Event4/_index.md", "content/4-EventParticipated/4.4-Event4/_index.vi.md", "content/3-BlogsPosted/3.1-Blog1/_index.md", "content/3-BlogsPosted/3.1-Blog1/_index.vi.md", "content/3-BlogsPosted/3.2-Blog2/_index.md", "content/3-BlogsPosted/3.2-Blog2/_index.vi.md", "content/3-BlogsPosted/3.3-Blog3/_index.md", "content/3-BlogsPosted/3.3-Blog3/_index.vi.md", "content/1-Worklog/1.1-Week1/_index.md", "content/1-Worklog/1.1-Week1/_index.vi.md", "content/1-Worklog/1.10-Week10/_index.md", "content/1-Worklog/1.10-Week10/_index.vi.md", "content/1-Worklog/1.11-Week11/_index.md", "content/1-Worklog/1.11-Week11/_index.vi.md", "content/1-Worklog/1.2-Week2/_index.md", "content/1-Worklog/1.2-Week2/_index.vi.md", "content/1-Worklog/1.3-Week3/_index.md", "content/1-Worklog/1.3-Week3/_index.vi.md", "content/1-Worklog/1.4-Week4/_index.md", "content/1-Worklog/1.4-Week4/_index.vi.md", "content/1-Worklog/1.5-Week5/_index.md", "content/1-Worklog/1.5-Week5/_index.vi.md", "content/1-Worklog/1.6-Week6/_index.md", "content/1-Worklog/1.6-Week6/_index.vi.md", "content/1-Worklog/1.7-Week7/_index.md", "content/1-Worklog/1.7-Week7/_index.vi.md", "content/1-Worklog/1.8-Week8/_index.md", "content/1-Worklog/1.8-Week8/_index.vi.md", "content/1-Worklog/1.9-Week9/_index.md", "content/1-Worklog/1.9-Week9/_index.vi.md"];
function parseReportMarkdown(text) {
 const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
 if (!front) throw new Error('Missing Markdown frontmatter');
 const metadata = {};
 for (const line of front[1].split(/\r?\n/)) {
  const field=line.match(/^(report_\w+): (.*)$/);
  if(field) metadata[field[1]]=JSON.parse(field[2]);
 }
 return {metadata,body:text.slice(front[0].length).trim()};
}
function assembleReport(documents) {
 const data={};
 for(const {metadata:m} of documents) {
  const key=m.report_key;
  if(!key)continue;
  const indexed=Number.isInteger(m.report_index);
  if(!data[key])data[key]=indexed?[]:{};
  const target=indexed?(data[key][m.report_index] ||= {}):data[key];
  Object.assign(target,m.report_shared||{});
  target[m.report_language]=m.report_fields;
  if(m.report_current_week!==undefined)data.currentWeek=m.report_current_week;
 }
 if(Object.keys(data).length!==9||data.worklogs.length!==11)throw new Error('Incomplete repository report');
 return data;
}
const app={data:null,currentLang:localStorage.getItem('fcaj_report_lang')==='en'?'en':'vi',currentRoute:location.hash.replace(/^#\//,'')||'thong-tin',
 setLang(lang){if(!['vi','en'].includes(lang))return;this.currentLang=lang;document.documentElement.lang=lang;localStorage.setItem('fcaj_report_lang',lang);}};
function navigateTo(route){app.currentRoute=route.replace(/^#\//,'')||'thong-tin';}
window.addEventListener('hashchange',()=>navigateTo(location.hash));
let repositoryDocuments=[];
const reportReady=Promise.all(reportPaths.map(async path=>{
 const response=await fetch(path, { cache: 'no-cache' });if(!response.ok)throw new Error(`${path}: HTTP ${response.status}`);
 return {path,...parseReportMarkdown(await response.text())};
})).then(documents=>{app.data=assembleReport(documents);repositoryDocuments=documents;return documents;});
const SELF_EVAL_CRITERIA = {
  vi: [
    { id: 1, name: "Kiến thức chuyên môn", desc: "Hiểu biết về ngành, áp dụng kiến thức vào thực tế, kỹ năng sử dụng công cụ (AWS Console, CLI, kiến trúc Cloud)" },
    { id: 2, name: "Khả năng học hỏi", desc: "Tiếp thu kiến thức mới, học nhanh, chủ động tìm hiểu tài liệu kỹ thuật AWS" },
    { id: 3, name: "Chủ động", desc: "Tự giác thực hiện nhiệm vụ, nghiên cứu giải pháp mà không chờ nhắc nhở" },
    { id: 4, name: "Tinh thần trách nhiệm", desc: "Hoàn thành công việc đúng hạn, đảm bảo chất lượng đầu ra và an toàn tài khoản" },
    { id: 5, name: "Kỷ luật", desc: "Tuân thủ giờ giấc, nội quy văn phòng FCAJ HCM và quy trình làm việc" },
    { id: 6, name: "Tính cầu thị", desc: "Sẵn sàng nhận feedback từ Mentor và cải thiện bản thân" },
    { id: 7, name: "Giao tiếp", desc: "Trình bày ý tưởng, viết tài liệu báo cáo và báo cáo công việc rõ ràng" },
    { id: 8, name: "Hợp tác", desc: "Làm việc nhóm hiệu quả, hỗ trợ đồng đội trong quá trình làm Project" },
    { id: 9, name: "Ứng xử chuyên nghiệp", desc: "Tôn trọng đồng nghiệp, Mentor, đối tác và môi trường làm việc" },
    { id: 10, name: "Tư duy giải quyết vấn đề", desc: "Xác định nguyên nhân lỗi kỹ thuật, đề xuất giải pháp hợp lý, sáng tạo" },
    { id: 11, name: "Đóng góp vào dự án / tổ chức", desc: "Hiệu quả công việc, sáng kiến cải tiến, chia sẻ bài viết Blog và Workshop" },
    { id: 12, name: "Tổng thể", desc: "Đánh giá chung về toàn bộ quá trình thực tập tại AWS First Cloud AI Journey" }
  ],
  en: [
    { id: 1, name: "Professional Knowledge", desc: "Understanding of the field, applying knowledge in practice, proficiency with tools (AWS Console, CLI, Cloud Architecture)" },
    { id: 2, name: "Ability to Learn", desc: "Absorbing new concepts quickly and proactively researching AWS technical documentation" },
    { id: 3, name: "Proactiveness", desc: "Taking initiative and researching solutions without waiting for reminders" },
    { id: 4, name: "Sense of Responsibility", desc: "Completing tasks on time, ensuring deliverable quality and cloud account security" },
    { id: 5, name: "Discipline", desc: "Adhering to schedules, FCAJ HCM office rules, and work processes" },
    { id: 6, name: "Openness to Feedback", desc: "Willingness to receive feedback from Mentors and continuously improve" },
    { id: 7, name: "Communication", desc: "Presenting ideas, writing technical documentation, and reporting work clearly" },
    { id: 8, name: "Teamwork", desc: "Working effectively with peers and supporting teammates during project execution" },
    { id: 9, name: "Professional Conduct", desc: "Respecting colleagues, Mentors, partners, and the workplace environment" },
    { id: 10, name: "Problem-Solving Skills", desc: "Identifying root causes of technical issues and proposing logical, creative solutions" },
    { id: 11, name: "Contribution to Project / Organization", desc: "Work effectiveness, innovative ideas, and sharing technical Blogs & Workshops" },
    { id: 12, name: "Overall", desc: "General evaluation of the entire internship journey at AWS First Cloud AI Journey" }
  ]
};

const WORKSHOP_CHAPTER_DEFINITIONS = {
  vi: [
    {
      code: "5.1",
      title: "5.1. Tổng quan về Workshop (Workshop Overview)",
      planned: "Dự định trình bày tại mục 5.1:\n- Giới thiệu bài toán thực hành, mục tiêu kỹ thuật và đối tượng hướng tới.\n- Sơ đồ kiến trúc tổng thể (Architecture Diagram) của bài Lab trên AWS.\n- Thời gian thực hiện dự kiến và lưu ý về chi phí (AWS Free Tier / Chi phí ước tính)."
    },
    {
      code: "5.2",
      title: "5.2. Các bước chuẩn bị (Prerequisites)",
      planned: "Dự định trình bày tại mục 5.2:\n- Yêu cầu tài khoản AWS, lựa chọn AWS Region (VD: ap-southeast-1) và phân quyền IAM User/Role cần thiết.\n- Chuẩn bị môi trường máy trạm (AWS CLI, SSH client, IDE, Git, Docker hoặc source code mẫu).\n- Khởi tạo các cặp khóa bảo mật (Key Pair) hoặc thông số cấu hình ban đầu."
    },
    {
      code: "5.3",
      title: "5.3. Triển khai hạ tầng & dịch vụ cốt lõi (Core Infrastructure)",
      planned: "Dự định trình bày tại mục 5.3:\n- Hướng dẫn từng bước (Step-by-step kèm ảnh chụp màn hình AWS Console) khởi tạo hạ tầng mạng (VPC, Subnets, Route Tables, IGW/NAT).\n- Cấu hình các lớp bảo mật (Security Groups, IAM Roles, KMS/WAF) và khởi tạo dịch vụ lưu trữ / cơ sở dữ liệu nền tảng."
    },
    {
      code: "5.4",
      title: "5.4. Triển khai ứng dụng & tích hợp (Application & Integration)",
      planned: "Dự định trình bày tại mục 5.4:\n- Triển khai tầng xử lý ứng dụng (EC2 / Lambda / ECS / API Gateway) và kết nối với cơ sở dữ liệu.\n- Cấu hình định tuyến, cân bằng tải hoặc tự động hóa CI/CD pipeline cho bài Lab."
    },
    {
      code: "5.5",
      title: "5.5. Kiểm thử, bảo mật & dự toán chi phí (Testing & Cost)",
      planned: "Dự định trình bày tại mục 5.5:\n- Kiểm thử hoạt động thực tế của hệ thống (End-to-End Validation) và minh chứng kết quả chạy thành công.\n- Kiểm tra nhật ký giám sát trên Amazon CloudWatch và phân tích chi phí vận hành của kiến trúc."
    },
    {
      code: "5.6",
      title: "5.6. Dọn dẹp tài nguyên (Clean up Resources)",
      planned: "Dự định trình bày tại mục 5.6 (Bắt buộc theo chuẩn Workshop FCAJ):\n- Hướng dẫn thứ tự xóa toàn bộ tài nguyên đã khởi tạo trong bài Lab (EC2, RDS, NAT Gateway, Elastic IP, S3 Bucket, VPC, CloudFormation Stack...).\n- Kiểm tra lại trang Billing Dashboard để đảm bảo không phát sinh chi phí ngoài ý muốn sau khi kết thúc thực hành."
    }
  ],
  en: [
    {
      code: "5.1",
      title: "5.1. Workshop Overview",
      planned: "Planned content for 5.1:\n- Introduce the hands-on lab scenario, learning objectives, and target audience.\n- Present the overall AWS Architecture Diagram for the workshop.\n- Specify estimated completion time and cost considerations."
    },
    {
      code: "5.2",
      title: "5.2. Prerequisites",
      planned: "Planned content for 5.2:\n- AWS account requirements, target AWS Region, and required IAM User/Role permissions.\n- Local environment setup (AWS CLI, SSH client, IDE, Git, or sample repository).\n- Creating initial Key Pairs or baseline configuration parameters."
    },
    {
      code: "5.3",
      title: "5.3. Core Infrastructure & Services Deployment",
      planned: "Planned content for 5.3:\n- Step-by-step instructions (with AWS Console screenshots) to provision networking (VPC, Subnets, Route Tables, IGW/NAT).\n- Configure security controls (Security Groups, IAM Roles) and foundational storage/database services."
    },
    {
      code: "5.4",
      title: "5.4. Application Deployment & Service Integration",
      planned: "Planned content for 5.4:\n- Deploy the compute/application tier (EC2 / Lambda / ECS / API Gateway) and connect to backend storage.\n- Configure routing, load balancing, or CI/CD automation."
    },
    {
      code: "5.5",
      title: "5.5. Validation, Monitoring & Cost Estimation",
      planned: "Planned content for 5.5:\n- Perform end-to-end functional & security testing with verification screenshots.\n- Inspect Amazon CloudWatch metrics/logs and review operational cost estimates."
    },
    {
      code: "5.6",
      title: "5.6. Clean up Resources",
      planned: "Planned content for 5.6 (Mandatory per FCAJ Workshop standard):\n- Step-by-step instructions to terminate and delete all provisioned resources (EC2, RDS, NAT Gateway, Elastic IP, S3, VPC...).\n- Verify Billing Dashboard to ensure zero unexpected charges remain after completing the lab."
    }
  ]
};

// ==========================================
// 3. DEFAULT BILINGUAL REPORT DATA (v26)
//    - Preserves Student Info, Week 1 & 2, Feedback
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isWeekPopulated(w, lang) {
  if (!w) return false;
  const c = w[lang] || w.vi;
  if (!c) return false;
  const hasTasks = Array.isArray(c.tasks) && c.tasks.length > 0;
  const hasMeta = (c.objectives && c.objectives.trim().length > 0) || (c.achievements && c.achievements.trim().length > 0);
  return hasTasks || hasMeta;
}

function isBlogPopulated(b, lang) {
  if (!b) return false;
  const c = b[lang] || b.vi;
  return Boolean(c && ((c.title && c.title.trim()) || (c.summary && c.summary.trim()) || (c.content && c.content.trim())));
}

function isEventPopulated(ev, lang) {
  if (!ev) return false;
  const c = ev[lang] || ev.vi;
  return Boolean(c && ((c.name && c.name.trim()) || (c.highlights && c.highlights.trim()) || (c.learnings && c.learnings.trim())));
}

function isWorkshopStepPopulated(ch, lang) {
  if (!ch) return false;
  const c = ch[lang] || ch.vi;
  return Boolean(c && ((c.content && c.content.trim()) || (c.notes && c.notes.trim())));
}

function getOrderedRoutesList() {
  const isVi = app.currentLang === 'vi';
  const list = [
    { route: 'thong-tin', title: isVi ? 'Báo cáo thực tập (Thông tin sinh viên)' : 'Internship Report (Student Info)' },
    { route: 'worklog', title: isVi ? '1. Nhật ký công việc (Tổng quan 11 tuần)' : '1. Worklog (11-Week Overview)' }
  ];
  for (let w = 1; w <= (app.data.worklogs || []).length; w++) {
    list.push({
      route: `worklog/week-${w}`,
      title: isVi ? `1.${w}. Worklog Tuần ${w}` : `1.${w}. Week ${w} Worklog`
    });
  }
  list.push({ route: 'proposal', title: isVi ? '2. Bản đề xuất (Proposal)' : '2. Project Proposal' });
  list.push({ route: 'blogs-posted', title: isVi ? '3. Các bài blogs đã đăng' : '3. Blogs Posted' });
  (app.data.blogEntries || []).forEach(b => {
    list.push({ route: `blogs-posted/blog-${b.num}`, title: `3.${b.num}. Blog ${b.num}` });
  });
  list.push({ route: 'events', title: isVi ? '4. Các events đã tham gia' : '4. Events Participated' });
  (app.data.eventEntries || []).forEach(ev => {
    list.push({ route: `events/event-${ev.num}`, title: `4.${ev.num}. Event ${ev.num}` });
  });
  list.push({ route: 'workshop', title: isVi ? '5. Workshop (Tổng quan)' : '5. Workshop (Overview)' });
  const wsDefs = WORKSHOP_CHAPTER_DEFINITIONS[app.currentLang] || WORKSHOP_CHAPTER_DEFINITIONS.vi;
  wsDefs.forEach(d => {
    list.push({ route: `workshop/${d.code}`, title: d.title });
  });
  list.push({ route: 'self-evaluation', title: isVi ? '6. Tự đánh giá' : '6. Self-Assessment' });
  list.push({ route: 'feedback', title: isVi ? '7. Chia sẻ, đóng góp ý kiến' : '7. Sharing & Feedback' });
  return list;
}

function formatTextToParagraphsOrList(rawText, emptyHtml) {
  if (!rawText || !rawText.trim()) {
    return emptyHtml;
  }
  const inlineFmt = s => escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  let html = '';
  let inList = false;

  lines.forEach(line => {
    if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      const clean = line.replace(/^[-•*]\s*/, '');
      html += `<li>${inlineFmt(clean)}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      const isHeadingLine = (/^\d+\.\s+/.test(line) && line.length <= 120) || (line.endsWith(':') && line.length <= 100);
      html += isHeadingLine
        ? `<p class="fc-prose-subhead">${inlineFmt(line)}</p>`
        : `<p class="fc-prose-body">${inlineFmt(line)}</p>`;
    }
  });
  if (inList) html += '</ul>';
  return html;
}

function renderInlineRef(text) {
  const safeHttpUrl = raw => {
    try {
      const url = new URL(raw);
      return ['http:', 'https:'].includes(url.protocol) ? escapeHtml(url.href) : '';
    } catch {
      return '';
    }
  };
  const parts = [];
  let lastIndex = 0;
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s;,)]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(escapeHtml(text.slice(lastIndex, match.index)));
    }
    const rawUrl = match[2] || match[3];
    const label = match[1] || match[3];
    const href = safeHttpUrl(rawUrl);
    if (href) {
      parts.push(`<a href="${href}" target="_blank" rel="noopener noreferrer" style="font-weight:600;">${escapeHtml(label)}</a>`);
    } else {
      parts.push(escapeHtml(match[0]));
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(escapeHtml(text.slice(lastIndex)));
  }
  return parts.join('');
}

function formatRefCell(refStr) {
  if (!refStr || !refStr.trim()) return '';
  const lines = refStr.split(/\r?\n|;\s*/).map(s => s.trim()).filter(Boolean);
  return lines.map(line => `<div><span>${renderInlineRef(line)}</span></div>`).join('');
}

const repositoryBlogLoads = new Map();
function loadRepositoryBlog(num, lang = app.currentLang) {
  const key = `${num}:${lang}`;
  const path = `content/3-BlogsPosted/3.${num}-Blog${num}/${lang === 'en' ? '_index.md' : '_index.vi.md'}`;
  if (!repositoryBlogLoads.has(key)) {
    repositoryBlogLoads.set(key, fetch(path, { cache: 'no-cache' }).then(response => {
      if (!response.ok) throw new Error(`Article HTTP ${response.status}`);
      return response.text();
    }).then(text => ({ path, body: text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim() })).catch(error => {
      repositoryBlogLoads.delete(key);
      throw error;
    }));
  }
  return repositoryBlogLoads.get(key);
}

function renderBlogMarkdown(markdown, path) {
  markdown = markdown.replace(/^\[(?:Mở tài liệu nguồn|Open source document) \(OneDrive\)\]\([^\n]+\)\s*$/gm, '');
  const safeUrl = value => {
    const url = new URL(value, new URL(path, document.baseURI));
    return ['http:', 'https:'].includes(url.protocol) ? escapeHtml(url.href) : '';
  };
  const inline = text => text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<>]+)/g).map(part => {
    if (part.startsWith('**')) return `<strong>${escapeHtml(part.slice(2, -2))}</strong>`;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return `<a href="${safeUrl(link[2])}" target="_blank" rel="noopener noreferrer">${escapeHtml(link[1])}</a>`;
    if (/^https?:\/\//.test(part)) return `<a href="${safeUrl(part)}" target="_blank" rel="noopener noreferrer">${escapeHtml(part)}</a>`;
    return escapeHtml(part);
  }).join('');
  // ponytail: source uses headings, paragraphs, lists, links and images only; extend for new syntax when needed.
  return markdown.split(/\r?\n\s*\r?\n/).map(block => {
    const heading = block.match(/^(#{1,6}) (.+)$/);
    if (heading) return `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;
    const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) return `<figure><img src="${safeUrl(image[2])}" alt="${escapeHtml(image[1])}" style="max-width:100%;height:auto" loading="lazy"></figure>`;
    if (block.split(/\r?\n/).every(line => line.startsWith('- '))) return `<ul>${block.split(/\r?\n/).map(line => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
    if (block.startsWith('> ')) return `<blockquote>${inline(block.slice(2))}</blockquote>`;
    return `<p>${inline(block)}</p>`;
  }).join('');
}
