-- Seed data mirrors the actual DFA Python Workshop content
-- (previously hardcoded in the site's SEC_TRACK / LABELS JS objects).

INSERT INTO workshop_sections (title, duration_label, section_order, audio_track_id, audio_track_label) VALUES
('Setup & Libraries', '45-minute hands-on', 0, 'ap-cell1', 'Cell 1 — Setup & Libraries'),
('Python Basics', '45-minute hands-on', 1, 'ap-cell2', 'Cell 2 — Variables & Lists'),
('Your First Chart', '45-minute hands-on', 2, 'ap-cell4', 'Cell 4 — Your First Chart'),
('Real Data', '45-minute hands-on', 3, 'ap-cell67', 'Cells 6 & 7 — Real Data'),
('Final Visualization', '45-minute hands-on', 4, 'ap-final', 'Final Visualization');

INSERT INTO code_snippets (language, code, expected_output, section_id) VALUES
('python', 'import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd', 'Libraries imported successfully.', 1),

('python', 'university = "UIUC"
semester = "Fall 2024"
total_courses = 6

courses = ["ART 101", "CS 101", "MATH 231"]
grades = [3.7, 4.0, 3.3]

average_gpa = sum(grades) / len(grades)', 'average_gpa -> 3.6666666666666665', 2),

('python', 'sns.barplot(x=names, y=gpa)
plt.title("GPA by Student")
plt.show()', 'Bar chart rendered showing GPA per student.', 3),

('python', 'df = pd.read_csv("uiuc_grade_distributions.csv")
sns.histplot(data=df, x="GPA")
plt.show()', 'Histogram of UIUC grade distributions rendered.', 4),

('python', '# Four-panel figure: scatter, heatmap, violin, and bonus plot
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
# ... section-by-section plotting logic ...
plt.tight_layout()
plt.show()', 'Final 2x2 grid of visualizations rendered.', 5);
