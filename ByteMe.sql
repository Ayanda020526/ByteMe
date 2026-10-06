-- ============================================================
-- ByteMe Smart Quiz Learning Platform
-- MySQL 8.0+ database schema + sample data + views
-- Run in MySQL Workbench / phpMyAdmin / mysql CLI
-- ============================================================

-- ------------------------------------------------------------
-- 1. Create and select the database
-- ------------------------------------------------------------
DROP DATABASE IF EXISTS byteme;
CREATE DATABASE byteme
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE byteme;

-- ------------------------------------------------------------
-- 2. Drop existing tables (safe re-run) in reverse-dependency order
-- ------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS weak_areas;
DROP TABLE IF EXISTS performance;
DROP TABLE IF EXISTS user_answers;
DROP TABLE IF EXISTS quiz_attempts;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS question_options;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS ai_generations;
DROP TABLE IF EXISTS study_materials;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- 3. Tables
-- ------------------------------------------------------------

CREATE TABLE users (
    user_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(150) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role          VARCHAR(20) NOT NULL DEFAULT 'student'
                  CHECK (role IN ('student','educator','admin')),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE subjects (
    subject_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) UNIQUE NOT NULL,
    description  TEXT
) ENGINE=InnoDB;

CREATE TABLE topics (
    topic_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_id   BIGINT NOT NULL,
    topic_name   VARCHAR(150) NOT NULL,
    description  TEXT,
    UNIQUE KEY uq_subject_topic (subject_id, topic_name),
    CONSTRAINT fk_topics_subject
        FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE study_materials (
    material_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT NOT NULL,
    subject_id    BIGINT NOT NULL,
    topic_id      BIGINT,
    title         VARCHAR(200) NOT NULL,
    material_type VARCHAR(30) NOT NULL
                  CHECK (material_type IN ('pdf','document','text','video','link','other')),
    content_text  TEXT,
    file_url      TEXT,
    uploaded_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_materials_user
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_materials_subject
        FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    CONSTRAINT fk_materials_topic
        FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE ai_generations (
    generation_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    material_id         BIGINT,
    user_id             BIGINT,
    model_name          VARCHAR(100),
    prompt_summary      TEXT,
    questions_requested INT DEFAULT 0 CHECK (questions_requested >= 0),
    generated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_aigen_material
        FOREIGN KEY (material_id) REFERENCES study_materials(material_id) ON DELETE SET NULL,
    CONSTRAINT fk_aigen_user
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE questions (
    question_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic_id         BIGINT NOT NULL,
    ai_generation_id BIGINT,
    question_text    TEXT NOT NULL,
    difficulty       VARCHAR(20) NOT NULL DEFAULT 'medium'
                     CHECK (difficulty IN ('easy','medium','hard')),
    explanation      TEXT,
    marks            INT NOT NULL DEFAULT 1 CHECK (marks > 0),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_questions_topic
        FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE,
    CONSTRAINT fk_questions_aigen
        FOREIGN KEY (ai_generation_id) REFERENCES ai_generations(generation_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE question_options (
    option_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct  BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_options_question
        FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE quizzes (
    quiz_id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_by        BIGINT,
    subject_id        BIGINT NOT NULL,
    topic_id          BIGINT,
    title             VARCHAR(200) NOT NULL,
    description       TEXT,
    difficulty        VARCHAR(20) NOT NULL DEFAULT 'medium'
                      CHECK (difficulty IN ('easy','medium','hard','adaptive')),
    time_limit_minutes INT CHECK (time_limit_minutes IS NULL OR time_limit_minutes > 0),
    is_ai_generated   BOOLEAN DEFAULT FALSE,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_quizzes_user
        FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL,
    CONSTRAINT fk_quizzes_subject
        FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    CONSTRAINT fk_quizzes_topic
        FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE quiz_questions (
    quiz_id        BIGINT NOT NULL,
    question_id    BIGINT NOT NULL,
    question_order INT NOT NULL CHECK (question_order > 0),
    PRIMARY KEY (quiz_id, question_id),
    UNIQUE KEY uq_quiz_order (quiz_id, question_order),
    CONSTRAINT fk_qq_quiz
        FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_qq_question
        FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE quiz_attempts (
    attempt_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id          BIGINT NOT NULL,
    user_id          BIGINT NOT NULL,
    started_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at     TIMESTAMP NULL,
    score            DECIMAL(6,2) CHECK (score IS NULL OR score BETWEEN 0 AND 100),
    correct_answers  INT DEFAULT 0 CHECK (correct_answers >= 0),
    total_questions  INT DEFAULT 0 CHECK (total_questions >= 0),
    final_difficulty VARCHAR(20)
                     CHECK (final_difficulty IN ('easy','medium','hard')),
    status           VARCHAR(20) DEFAULT 'in_progress'
                     CHECK (status IN ('in_progress','completed','abandoned')),
    CONSTRAINT fk_attempts_quiz
        FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_attempts_user
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE user_answers (
    answer_id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    attempt_id         BIGINT NOT NULL,
    question_id        BIGINT NOT NULL,
    selected_option_id BIGINT,
    answer_text        TEXT,
    is_correct         BOOLEAN,
    time_taken_seconds INT CHECK (time_taken_seconds IS NULL OR time_taken_seconds >= 0),
    answered_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_attempt_question (attempt_id, question_id),
    CONSTRAINT fk_answers_attempt
        FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(attempt_id) ON DELETE CASCADE,
    CONSTRAINT fk_answers_question
        FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
    CONSTRAINT fk_answers_option
        FOREIGN KEY (selected_option_id) REFERENCES question_options(option_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE performance (
    performance_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT NOT NULL,
    topic_id            BIGINT NOT NULL,
    quizzes_completed   INT DEFAULT 0,
    questions_answered  INT DEFAULT 0,
    correct_answers     INT DEFAULT 0,
    score_percentage    DECIMAL(6,2) DEFAULT 0 CHECK (score_percentage BETWEEN 0 AND 100),
    average_time_seconds DECIMAL(10,2),
    last_updated        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_topic (user_id, topic_id),
    CONSTRAINT fk_perf_user
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_perf_topic
        FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE weak_areas (
    weak_area_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id            BIGINT NOT NULL,
    topic_id           BIGINT NOT NULL,
    weakness_score     DECIMAL(6,2) NOT NULL CHECK (weakness_score BETWEEN 0 AND 100),
    reason             TEXT,
    recommended_action TEXT,
    identified_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at        TIMESTAMP NULL,
    UNIQUE KEY uq_user_topic_weak (user_id, topic_id),
    CONSTRAINT fk_weak_user
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_weak_topic
        FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 4. Indexes
-- ------------------------------------------------------------
CREATE INDEX idx_topics_subject        ON topics(subject_id);
CREATE INDEX idx_questions_topic       ON questions(topic_id);
CREATE INDEX idx_quiz_questions_q      ON quiz_questions(question_id);
CREATE INDEX idx_attempts_user         ON quiz_attempts(user_id);
CREATE INDEX idx_answers_attempt       ON user_answers(attempt_id);
CREATE INDEX idx_performance_user      ON performance(user_id);
CREATE INDEX idx_weak_areas_user       ON weak_areas(user_id);

-- ------------------------------------------------------------
-- 5. Sample data
-- ------------------------------------------------------------
-- NOTE: Replace REPLACE_WITH_BCRYPT_HASH with a real bcrypt hash
-- if you intend to log in with these demo accounts.
INSERT INTO users(full_name, email, password_hash, role) VALUES
('Demo Student',        'student@byteme.local',  'REPLACE_WITH_BCRYPT_HASH', 'student'),
('Demo Educator',       'educator@byteme.local', 'REPLACE_WITH_BCRYPT_HASH', 'educator'),
('System Administrator','admin@byteme.local',    'REPLACE_WITH_BCRYPT_HASH', 'admin');

INSERT INTO subjects(subject_name, description) VALUES
('Physics',          'Physics study and practice'),
('Mathematics',      'Mathematics study and practice'),
('Computer Science', 'Programming and computing concepts');

INSERT INTO topics(subject_id, topic_name, description) VALUES
((SELECT subject_id FROM subjects WHERE subject_name='Physics'),          'Mechanics',        'Motion, forces and Newtonian mechanics'),
((SELECT subject_id FROM subjects WHERE subject_name='Physics'),          'Electromagnetism', 'Electric and magnetic fields'),
((SELECT subject_id FROM subjects WHERE subject_name='Mathematics'),      'Linear Algebra',   'Vectors, matrices and linear transformations'),
((SELECT subject_id FROM subjects WHERE subject_name='Mathematics'),      'Complex Analysis', 'Complex numbers and complex functions'),
((SELECT subject_id FROM subjects WHERE subject_name='Computer Science'), 'Data Structures',  'Fundamental data structures and algorithms'),
((SELECT subject_id FROM subjects WHERE subject_name='Computer Science'), 'SQL',              'Relational databases and SQL queries');

-- ------------------------------------------------------------
-- 6. Views (MySQL syntax; FILTER replaced with CASE)
-- ------------------------------------------------------------
CREATE VIEW v_user_quiz_summary AS
SELECT u.user_id,
       u.full_name,
       u.email,
       COUNT(a.attempt_id) AS total_attempts,
       SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed_quizzes,
       ROUND(AVG(CASE WHEN a.status = 'completed' THEN a.score END), 2) AS average_score
FROM users u
LEFT JOIN quiz_attempts a ON a.user_id = u.user_id
GROUP BY u.user_id, u.full_name, u.email;

CREATE VIEW v_topic_performance AS
SELECT u.full_name,
       s.subject_name,
       t.topic_name,
       p.quizzes_completed,
       p.questions_answered,
       p.correct_answers,
       p.score_percentage,
       p.average_time_seconds,
       p.last_updated
FROM performance p
JOIN users    u ON u.user_id = p.user_id
JOIN topics   t ON t.topic_id = p.topic_id
JOIN subjects s ON s.subject_id = t.subject_id;

CREATE VIEW v_weak_areas AS
SELECT u.full_name,
       s.subject_name,
       t.topic_name,
       w.weakness_score,
       w.reason,
       w.recommended_action,
       w.identified_at
FROM weak_areas w
JOIN users    u ON u.user_id = w.user_id
JOIN topics   t ON t.topic_id = w.topic_id
JOIN subjects s ON s.subject_id = t.subject_id
WHERE w.resolved_at IS NULL;

-- ------------------------------------------------------------
-- 7. Verification
-- ------------------------------------------------------------
SELECT 'Database created successfully' AS status;
SHOW TABLES;
SELECT 'users'    AS tbl, COUNT(*) AS rows_count FROM users
UNION ALL SELECT 'subjects', COUNT(*) FROM subjects
UNION ALL SELECT 'topics',   COUNT(*) FROM topics;