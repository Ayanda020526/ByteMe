# System Decomposition

## System Modules

The Smart Quiz App is divided into the following major components.

---

## 1. User Management Module

### Responsibilities
- User registration
- User login
- Authentication
- Profile management

---

## 2. Quiz Engine Module

### Responsibilities
- Generate quizzes
- Present questions
- Evaluate answers
- Calculate scores

---

## 3. AI Question Generator Module

### Responsibilities
- Generate questions from uploaded notes
- Adjust difficulty levels
- Produce adaptive assessments

---

## 4. Performance Analytics Module

### Responsibilities
- Track quiz performance
- Identify weak areas
- Generate progress reports

---

## 5. Content Upload Module

### Responsibilities
- Upload study notes
- Process content
- Store learning materials

---

## 6. Admin Dashboard Module

### Responsibilities
- Monitor users
- Manage uploaded content
- Review system performance

---

## Component Interaction

The modules interact as follows:

- Users interact with the User Interface
- Requests are sent to the Backend API
- The Backend coordinates:
  - Authentication
  - Quiz generation
  - AI processing
  - Database access

All modules work together to deliver adaptive quizzes.
