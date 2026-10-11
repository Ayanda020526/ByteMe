# Team Meeting Log

## Meeting 1: Project Discussion

- Date: 30 March 2026
- Time: 10:00 am
- Venue: Campus
- Attendance: 4 members present
- Absent: Phumlani Zulu

### Agenda
- Project idea discussion
- Role assignment
- GitHub setup

### Decisions Made
- Selected Smart Quiz App
- Assigned roles to members

### Action Items

| Task | Assigned To | 
|------|------------|
| Setup GitHub | Ayanda Kolisi |
| Product Vision | Liyema Damoyi|
| Wireframes | Ntando Notyhawe|

### Next Steps
- Finalize product vision
- Begin wireframe design

# Project Implementation Discussions
## Meeting Log 1: Setup & Initial Architectural Setup

**Date & Time:** Monday,17 August 2026 @11:00 AM
**Present Members:** Liyema Damoyi (Lead Frontend Architect), Backend Engineer, Database/AI Engineer
-**Core Discussion Agenda:** Defining the project layout boundaries, tech stack requirements, and repository branch parameters.
-**Handover Actions & Team Responsibilities:**
	• Frontend Completed (Liyema): Created initial core configuration files, setup the global CSS theme parameters (Burgundy, Gold, Mint, Sunset Orange, and Violet), and initialized the React workspace via Vite.
	• Backend Team Action Item: Assigned to spin up the local server framework environment (Node.js Express / PHP) and build standard template mock response arrays.
	• Database/AI Team Action Item: Scheduled to research LLM API pricing boundaries (Gemini/OpenAI) and design system prompt structural patterns.

  ## Meeting Log 2: Authentication Strategy & Role Spit Design
**Date & Timestamp:** Friday, 28 August 2026 @ 10:30 AM
**Present Members:** Liyema Damoyi, Ayanda Kolisi, Philasande Ngaveli

**Core Discussion Agenda:** Planning system authorization patterns. Resolving how the routing shell distinguishes between a Student view and a Lecturer view upon login.

**Handover Actions & Team Responsibilities:**
	• Frontend Completed (Liyema): Coded the frontend layout tracking parameters for user verification guards (DashboardRouterWrapper) using client-side cache sandboxing.
	• Backend Team Action Item: Responsible for programming the corresponding encryption endpoint loops (POST /api/auth/login). They must now match the frontend variable schema contract fields (role, username, email, studentNumber, staffId, and yearOfStudy).

  ## Meeting Log 3:Repository Setup Bug & Integration Mapping
  **Date & Timestamp:** Tuesday, 8 September 2026 @ 13:10 PM
  **Present Members:** Full Group Synchronisation Sync
  
  **Core Discussion Agenda:** Resolving layout structure collisions inside the new GitHub online workspace settings panel and structuring initial file distributions.
  
  **Handover Actions & Team Responsibilities:**
	• Frontend Completed : Fixed the missing tracking block bugs inside the online repository panel view interface and initialized files for Login.jsx, Register.jsx, Dashboard.jsx, and Analytics.jsx.
	• Backend & Data Team Action Item: Instructed to immediately pull down the fixed frontend boilerplate repository track and begin setting up structural routes to receive test data loads.


  ## Meeting Log 4: Project Handover & Repository Rules
**Date & Timestamp:** Friday, 11 September 2026 @ 11:00 PM
**Present Members:** Full Group Synchronisation Sync

**Core Discussion Agenda:** Aligning parameters to hand over the frontend UI shells cleanly to the backend and data teams without leaking massive dependency assets.

**Handover Actions & Team Responsibilities:**
	• Frontend Completed (Liyema): Finished the raw component templates for student test-taking windows and dashboard views. Cleanly zipped the project archive folder while enforcing strict exclusion of node_modules to keep the size small.
	• Backend Team Action Item: Mandatory deployment of CORS Middleware (app.use(cors())) on their active network layers to allow communication over separate local host numbers.
	• Database/AI Team Action Item: Tasked with building out the live SQL / NoSQL database table schemas for users and saved quizzes matching the layout dictionary maps.

  ## Meeting Log 5: Authentication Confliction Resolution(The Form Freeze Bug)
*Date & Timestamp: Wednesday, 23 September 2026 @ 09:00 AM
*Present Members: Liyema Damoyi, Philile Bele, Phikolomzi Ndayi

*Core Discussion Agenda: Investigating a critical runtime error where students were blocked from registering accounts due to overlapping validation requirements.

**Handover Actions & Team Responsibilities:**
	• Frontend Completed (Liyema): Resolved the hidden input freeze by implementing React short-circuit logical switches ({role === "student" && (...) }), cleaning up field execution completely.
	• Database/AI Team Action Item: Now that registration runs smoothly, the database team must establish relational constraints preventing a duplicate studentNumber or staffId entry inside table records.

## Meeting Log 6: Interface Unfreezing & Rule Complince 
* Date & Timestamp: Monday, 01 October 2026 @ 11:15 AM
 
 * Present Members: Liyema Damoyi (Solo Architectural Overhaul Sprint)
   
* Core Discussion Agenda: Fixing frozen sidebar clicks and cross-role view bleeding on secondary pages like Profile.jsx and Quiz.jsx.
  **Handover Actions & Team Responsibilities:**
	• Frontend Completed (Liyema): Corrected the state structure loop placements to fully satisfy the strict Rules of Hooks, completely unfreezing every single sidebar nav panel click.
	• Backend Team Action Item: Must now verify that all target router directories correctly direct incoming user profiles straight to their separate lecturer database pools.

## Meeting Log 7: Expanded Dashboard Workspace Features Update

* Date & Timestamp: Tuesday, 06 October 2026 @ 15:45 PM
* 
* Present Members: Full Group Final Evaluation Review
* Core Discussion Agenda: Wrapping up final feature matrices requested for the project evaluation showcase panel review.
  **Handover Actions & Team Responsibilities:**
	• Frontend Completed: Formally integrated the full-screen modal class roster, student answers review card screens, and the automated AI Pulse glow animation markers (LuActivity).
	• Backend Team Action Item: Must tie their real-time data rows into the full-screen student roster tables view via fetch pipelines.
	• Database/AI Team Action Item: Responsible for replacing the mock local backup questions array pool inside aiPromptService.js with active model integration endpoints (POST /api/quiz/generate) that return clean JSON sets based on lecturer uploads.
