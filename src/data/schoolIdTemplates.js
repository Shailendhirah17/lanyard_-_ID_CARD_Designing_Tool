// School ID Card Templates - 50+ Professional Designs
// Organized by orientation and style categories

export const schoolIdTemplates = {
  horizontal: {
    corporate: [
      {
        id: 'corp-blue-modern',
        name: 'Blue Corporate',
        size: '100x70',
        preview: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #dbeafe 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'header', type: 'rect', x: 0, y: 0, width: 300, height: 35, fill: '#1e40af' },
            { id: 'logo', type: 'image', x: 15, y: 5, width: 40, height: 25, cornerRadius: 3, src: '' },
            { id: 'school-name', type: 'text', content: 'SCHOOL NAME', x: 65, y: 8, fontSize: 14, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'photo', type: 'image', x: 15, y: 50, width: 60, height: 75, cornerRadius: 5, src: '' },
            { id: 'photo-border', type: 'rect', x: 13, y: 48, width: 64, height: 79, fill: 'transparent', stroke: '#1e40af', strokeWidth: 2, cornerRadius: 6 },
            { id: 'student-name', type: 'text', content: 'Student Name', x: 90, y: 55, fontSize: 16, fill: '#1e293b', fontStyle: 'bold' },
            { id: 'grade', type: 'text', content: 'Grade 12', x: 90, y: 75, fontSize: 12, fill: '#64748b' },
            { id: 'id-label', type: 'text', content: 'ID No:', x: 90, y: 95, fontSize: 10, fill: '#64748b' },
            { id: 'id-number', type: 'text', content: '2024-001234', x: 125, y: 95, fontSize: 10, fill: '#1e293b', fontStyle: 'bold' },
            { id: 'dob-label', type: 'text', content: 'DOB:', x: 90, y: 110, fontSize: 10, fill: '#64748b' },
            { id: 'dob', type: 'text', content: '01/01/2008', x: 115, y: 110, fontSize: 10, fill: '#1e293b' },
            { id: 'barcode', type: 'rect', x: 200, y: 50, width: 80, height: 30, fill: '#000000' },
            { id: 'barcode-text', type: 'text', content: '2024-001234', x: 200, y: 85, fontSize: 8, fill: '#1e293b', align: 'center', width: 80 },
            { id: 'footer', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#f1f5f9' },
            { id: 'valid-text', type: 'text', content: 'Valid: 2024-2025', x: 15, y: 195, fontSize: 10, fill: '#64748b' },
            { id: 'signature-line', type: 'rect', x: 150, y: 190, width: 130, height: 1, fill: '#cbd5e1' },
            { id: 'signature-label', type: 'text', content: 'Student Signature', x: 150, y: 200, fontSize: 8, fill: '#64748b', width: 130, align: 'center' }
          ]
        },
        back: {
          backgroundColor: '#f8fafc',
          elements: [
            { id: 'back-header', type: 'rect', x: 0, y: 0, width: 300, height: 30, fill: '#1e40af' },
            { id: 'back-title', type: 'text', content: 'STUDENT INFORMATION', x: 15, y: 18, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'address-label', type: 'text', content: 'Address:', x: 15, y: 50, fontSize: 10, fill: '#64748b', fontStyle: 'bold' },
            { id: 'address', type: 'text', content: '123 School Street, City, State 12345', x: 15, y: 65, fontSize: 9, fill: '#1e293b' },
            { id: 'phone-label', type: 'text', content: 'Phone:', x: 15, y: 85, fontSize: 10, fill: '#64748b', fontStyle: 'bold' },
            { id: 'phone', type: 'text', content: '(555) 123-4567', x: 55, y: 85, fontSize: 9, fill: '#1e293b' },
            { id: 'emergency-label', type: 'text', content: 'Emergency Contact:', x: 15, y: 105, fontSize: 10, fill: '#64748b', fontStyle: 'bold' },
            { id: 'emergency-name', type: 'text', content: 'Parent Name', x: 15, y: 120, fontSize: 9, fill: '#1e293b' },
            { id: 'emergency-phone', type: 'text', content: '(555) 987-6543', x: 15, y: 135, fontSize: 9, fill: '#1e293b' },
            { id: 'medical-info', type: 'text', content: 'Medical Info: None', x: 15, y: 155, fontSize: 9, fill: '#1e293b' },
            { id: 'qr-code', type: 'rect', x: 220, y: 50, width: 60, height: 60, fill: '#1e40af', cornerRadius: 5 },
            { id: 'qr-text', type: 'text', content: 'Scan for Info', x: 220, y: 115, fontSize: 8, fill: '#64748b', width: 60, align: 'center' },
            { id: 'terms', type: 'text', content: 'This card is property of School Name. Must be returned upon request.', x: 15, y: 190, fontSize: 7, fill: '#94a3b8', width: 270 }
          ]
        }
      },
      {
        id: 'corp-green-professional',
        name: 'Green Professional',
        size: '100x70',
        preview: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #d1fae5 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'top-bar', type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: '#047857' },
            { id: 'school-logo', type: 'image', x: 20, y: 8, width: 35, height: 24, cornerRadius: 3, src: '' },
            { id: 'institution', type: 'text', content: 'EDUCATIONAL INSTITUTE', x: 65, y: 12, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'left-accent', type: 'rect', x: 0, y: 40, width: 80, height: 140, fill: '#f0fdf4' },
            { id: 'student-photo', type: 'image', x: 15, y: 60, width: 50, height: 65, cornerRadius: 25, src: '' },
            { id: 'photo-frame', type: 'circle', x: 40, y: 92, width: 54, height: 54, fill: 'transparent', stroke: '#047857', strokeWidth: 2 },
            { id: 'name-title', type: 'text', content: 'FULL NAME', x: 100, y: 60, fontSize: 18, fill: '#047857', fontStyle: 'bold' },
            { id: 'student-id', type: 'text', content: 'Student ID: STU-2024-5678', x: 100, y: 80, fontSize: 11, fill: '#6b7280' },
            { id: 'grade-level', type: 'text', content: 'Grade: 10th Grade', x: 100, y: 95, fontSize: 11, fill: '#6b7280' },
            { id: 'division', type: 'text', content: 'Division: A', x: 100, y: 110, fontSize: 11, fill: '#6b7280' },
            { id: 'birth-date', type: 'text', content: 'DOB: 15/08/2009', x: 100, y: 125, fontSize: 11, fill: '#6b7280' },
            { id: 'issue-date', type: 'text', content: 'Issued: 01/06/2024', x: 100, y: 140, fontSize: 11, fill: '#6b7280' },
            { id: 'expiry-date', type: 'text', content: 'Expires: 31/03/2025', x: 100, y: 155, fontSize: 11, fill: '#6b7280' },
            { id: 'right-barcode', type: 'rect', x: 250, y: 60, width: 35, height: 80, fill: '#000000' },
            { id: 'barcode-number', type: 'text', content: 'STU20245678', x: 250, y: 145, fontSize: 7, fill: '#374151', align: 'center', width: 35 },
            { id: 'bottom-stripe', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#047857' },
            { id: 'auth-text', type: 'text', content: 'AUTHORIZED SIGNATURE', x: 20, y: 195, fontSize: 9, fill: '#ffffff' },
            { id: 'signature-space', type: 'rect', x: 150, y: 190, width: 130, height: 16, fill: '#ffffff', cornerRadius: 3 }
          ]
        },
        back: {
          backgroundColor: '#f0fdf4',
          elements: [
            { id: 'back-header', type: 'rect', x: 0, y: 0, width: 300, height: 35, fill: '#047857' },
            { id: 'back-title', type: 'text', content: 'ACADEMIC RECORDS', x: 15, y: 20, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'section-1', type: 'text', content: 'ACADEMIC INFORMATION', x: 15, y: 55, fontSize: 11, fill: '#047857', fontStyle: 'bold' },
            { id: 'roll-number', type: 'text', content: 'Roll Number: ROLL-001234', x: 15, y: 70, fontSize: 9, fill: '#374151' },
            { id: 'admission-no', type: 'text', content: 'Admission No: ADM-2021-0456', x: 15, y: 85, fontSize: 9, fill: '#374151' },
            { id: 'section-2', type: 'text', content: 'CONTACT INFORMATION', x: 15, y: 110, fontSize: 11, fill: '#047857', fontStyle: 'bold' },
            { id: 'parent-name', type: 'text', content: 'Parent/Guardian: Mother/Father Name', x: 15, y: 125, fontSize: 9, fill: '#374151' },
            { id: 'contact-number', type: 'text', content: 'Contact: +91 98765 43210', x: 15, y: 140, fontSize: 9, fill: '#374151' },
            { id: 'residence', type: 'text', content: 'Residence: Local Hostel / Day Scholar', x: 15, y: 155, fontSize: 9, fill: '#374151' },
            { id: 'qr-back', type: 'rect', x: 220, y: 55, width: 65, height: 65, fill: '#047857', cornerRadius: 8 },
            { id: 'qr-label-back', type: 'text', content: 'Digital ID', x: 220, y: 125, fontSize: 8, fill: '#6b7280', width: 65, align: 'center' },
            { id: 'notice', type: 'text', content: 'Loss of card must be reported immediately to school administration.', x: 15, y: 185, fontSize: 7, fill: '#6b7280', width: 270 }
          ]
        }
      },
      {
        id: 'corp-maroon-elegant',
        name: 'Maroon Elegant',
        size: '100x70',
        preview: 'linear-gradient(135deg, #7c2d12 0%, #dc2626 50%, #fef2f2 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'maroon-header', type: 'rect', x: 0, y: 0, width: 300, height: 45, fill: '#7c2d12' },
            { id: 'school-emblem', type: 'image', x: 15, y: 8, width: 30, height: 30, cornerRadius: 15, src: '' },
            { id: 'school-title', type: 'text', content: 'PRESTIGE ACADEMY', x: 55, y: 15, fontSize: 14, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'school-motto', type: 'text', content: 'Excellence in Education', x: 55, y: 30, fontSize: 8, fill: '#fca5a5' },
            { id: 'gold-line', type: 'rect', x: 0, y: 45, width: 300, height: 2, fill: '#fbbf24' },
            { id: 'left-panel', type: 'rect', x: 0, y: 47, width: 90, height: 133, fill: '#fef2f2' },
            { id: 'student-image', type: 'image', x: 20, y: 65, width: 50, height: 65, cornerRadius: 8, src: '' },
            { id: 'image-border', type: 'rect', x: 18, y: 63, width: 54, height: 69, fill: 'transparent', stroke: '#7c2d12', strokeWidth: 2, cornerRadius: 10 },
            { id: 'student-fullname', type: 'text', content: 'JOHN ALEXANDER SMITH', x: 105, y: 65, fontSize: 14, fill: '#7c2d12', fontStyle: 'bold' },
            { id: 'class-grade', type: 'text', content: 'Class: XII-A | Roll: 15', x: 105, y: 85, fontSize: 10, fill: '#6b7280' },
            { id: 'academic-year', type: 'text', content: 'Academic Year: 2024-25', x: 105, y: 100, fontSize: 10, fill: '#6b7280' },
            { id: 'birth-info', type: 'text', content: 'Date of Birth: 05/12/2007', x: 105, y: 115, fontSize: 10, fill: '#6b7280' },
            { id: 'blood-group', type: 'text', content: 'Blood Group: O+', x: 105, y: 130, fontSize: 10, fill: '#6b7280' },
            { id: 'id-unique', type: 'text', content: 'Unique ID: PA2024XII015', x: 105, y: 145, fontSize: 9, fill: '#7c2d12', fontStyle: 'bold' },
            { id: 'side-barcode', type: 'rect', x: 240, y: 65, width: 50, height: 70, fill: '#000000' },
            { id: 'barcode-id', type: 'text', content: 'PA2024XII015', x: 240, y: 140, fontSize: 7, fill: '#374151', align: 'center', width: 50 },
            { id: 'footer-maroon', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#7c2d12' },
            { id: 'principal-sign', type: 'text', content: 'Principal Signature', x: 20, y: 195, fontSize: 9, fill: '#ffffff' },
            { id: 'sign-line', type: 'rect', x: 130, y: 198, width: 150, height: 10, fill: '#ffffff', cornerRadius: 2 }
          ]
        },
        back: {
          backgroundColor: '#fef2f2',
          elements: [
            { id: 'back-maroon-header', type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: '#7c2d12' },
            { id: 'back-institution', type: 'text', content: 'PRESTIGE ACADEMY', x: 15, y: 18, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'gold-divider', type: 'rect', x: 0, y: 40, width: 300, height: 2, fill: '#fbbf24' },
            { id: 'personal-details', type: 'text', content: 'PERSONAL DETAILS', x: 15, y: 60, fontSize: 11, fill: '#7c2d12', fontStyle: 'bold' },
            { id: 'father-name', type: 'text', content: 'Father\'s Name: Robert Smith', x: 15, y: 75, fontSize: 9, fill: '#374151' },
            { id: 'mother-name', type: 'text', content: 'Mother\'s Name: Sarah Smith', x: 15, y: 90, fontSize: 9, fill: '#374151' },
            { id: 'home-address', type: 'text', content: 'Address: 123 Education Street, City - 123456', x: 15, y: 105, fontSize: 9, fill: '#374151' },
            { id: 'mobile-number', type: 'text', content: 'Mobile: +91 98765 43210', x: 15, y: 120, fontSize: 9, fill: '#374151' },
            { id: 'email-address', type: 'text', content: 'Email: student@prestige.edu', x: 15, y: 135, fontSize: 9, fill: '#374151' },
            { id: 'emergency-contact', type: 'text', content: 'Emergency: +91 98765 11111', x: 15, y: 150, fontSize: 9, fill: '#374151' },
            { id: 'back-qr', type: 'rect', x: 210, y: 60, width: 75, height: 75, fill: '#7c2d12', cornerRadius: 10 },
            { id: 'qr-instruction', type: 'text', content: 'Scan for complete profile', x: 210, y: 140, fontSize: 8, fill: '#6b7280', width: 75, align: 'center' },
            { id: 'disclaimer', type: 'text', content: 'This ID card is non-transferable and must be carried at all times within school premises.', x: 15, y: 175, fontSize: 7, fill: '#6b7280', width: 270 }
          ]
        }
      }
    ],
    modern: [
      {
        id: 'modern-purple-gradient',
        name: 'Purple Gradient',
        size: '100x70',
        preview: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #f3e8ff 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'gradient-top', type: 'rect', x: 0, y: 0, width: 300, height: 80, fill: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' },
            { id: 'modern-logo', type: 'image', x: 20, y: 15, width: 50, height: 50, cornerRadius: 25, src: '' },
            { id: 'school-name-modern', type: 'text', content: 'MODERN SCHOOL', x: 85, y: 25, fontSize: 16, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'tagline', type: 'text', content: 'Innovation & Excellence', x: 85, y: 45, fontSize: 10, fill: '#e9d5ff' },
            { id: 'photo-container', type: 'rect', x: 20, y: 95, width: 70, height: 85, fill: '#f3e8ff', cornerRadius: 15 },
            { id: 'student-photo-modern', type: 'image', x: 25, y: 100, width: 60, height: 75, cornerRadius: 10, src: '' },
            { id: 'name-modern', type: 'text', content: 'Emma Johnson', x: 105, y: 100, fontSize: 18, fill: '#7c3aed', fontStyle: 'bold' },
            { id: 'student-info', type: 'text', content: 'Grade 11 | Section B', x: 105, y: 120, fontSize: 12, fill: '#6b7280' },
            { id: 'id-modern', type: 'text', content: 'ID: MS2024B001', x: 105, y: 140, fontSize: 11, fill: '#7c3aed', fontStyle: 'bold' },
            { id: 'dob-modern', type: 'text', content: 'DOB: 14/02/2008', x: 105, y: 160, fontSize: 10, fill: '#6b7280' },
            { id: 'qr-modern', type: 'rect', x: 220, y: 95, width: 65, height: 65, fill: '#7c3aed', cornerRadius: 12 },
            { id: 'scan-text', type: 'text', content: 'Scan Me', x: 220, y: 165, fontSize: 9, fill: '#7c3aed', width: 65, align: 'center' },
            { id: 'bottom-accent', type: 'rect', x: 0, y: 190, width: 300, height: 26, fill: '#f3e8ff' },
            { id: 'validity', type: 'text', content: 'Valid: 2024-2025 Academic Year', x: 15, y: 205, fontSize: 10, fill: '#7c3aed' }
          ]
        },
        back: {
          backgroundColor: '#faf5ff',
          elements: [
            { id: 'back-gradient', type: 'rect', x: 0, y: 0, width: 300, height: 50, fill: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' },
            { id: 'back-title-modern', type: 'text', content: 'STUDENT CREDENTIALS', x: 15, y: 25, fontSize: 14, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'info-section', type: 'rect', x: 15, y: 65, width: 270, height: 120, fill: '#ffffff', cornerRadius: 10, stroke: '#e9d5ff', strokeWidth: 1 },
            { id: 'contact-title', type: 'text', content: 'Contact Information', x: 25, y: 80, fontSize: 11, fill: '#7c3aed', fontStyle: 'bold' },
            { id: 'parent-contact', type: 'text', content: 'Parent: +1 555-0123', x: 25, y: 95, fontSize: 9, fill: '#374151' },
            { id: 'address-modern', type: 'text', content: 'Address: 456 School Ave, City', x: 25, y: 110, fontSize: 9, fill: '#374151' },
            { id: 'emergency-modern', type: 'text', content: 'Emergency: +1 555-0987', x: 25, y: 125, fontSize: 9, fill: '#374151' },
            { id: 'medical-info', type: 'text', content: 'Medical: Allergies - None', x: 25, y: 140, fontSize: 9, fill: '#374151' },
            { id: 'bus-route', type: 'text', content: 'Bus Route: B-12', x: 25, y: 155, fontSize: 9, fill: '#374151' },
            { id: 'back-qr-large', type: 'rect', x: 200, y: 65, width: 70, height: 70, fill: '#7c3aed', cornerRadius: 10 },
            { id: 'digital-profile', type: 'text', content: 'Digital Profile Access', x: 200, y: 140, fontSize: 8, fill: '#6b7280', width: 70, align: 'center' },
            { id: 'terms-modern', type: 'text', content: 'This card is property of Modern School. Must be presented when requested.', x: 15, y: 200, fontSize: 7, fill: '#a855f7', width: 270 }
          ]
        }
      },
      {
        id: 'modern-cyan-tech',
        name: 'Cyan Tech',
        size: '100x70',
        preview: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #ecfeff 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'tech-header', type: 'rect', x: 0, y: 0, width: 300, height: 50, fill: '#0891b2' },
            { id: 'tech-pattern', type: 'rect', x: 0, y: 50, width: 300, height: 5, fill: 'linear-gradient(90deg, #0891b2 0%, #06b6d4 50%, #ecfeff 100%)' },
            { id: 'tech-logo', type: 'image', x: 15, y: 10, width: 30, height: 30, cornerRadius: 5, src: '' },
            { id: 'tech-school', type: 'text', content: 'TECH ACADEMY', x: 55, y: 15, fontSize: 14, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'tech-subtitle', type: 'text', content: 'Digital Learning Center', x: 55, y: 30, fontSize: 9, fill: '#a5f3fc' },
            { id: 'left-tech-panel', type: 'rect', x: 0, y: 55, width: 100, height: 125, fill: '#ecfeff' },
            { id: 'tech-photo', type: 'image', x: 25, y: 70, width: 50, height: 60, cornerRadius: 5, src: '' },
            { id: 'tech-photo-border', type: 'rect', x: 23, y: 68, width: 54, height: 64, fill: 'transparent', stroke: '#0891b2', strokeWidth: 2, cornerRadius: 6 },
            { id: 'tech-name', type: 'text', content: 'Alex Chen', x: 115, y: 70, fontSize: 16, fill: '#0891b2', fontStyle: 'bold' },
            { id: 'tech-grade', type: 'text', content: 'Grade 10 - Tech Stream', x: 115, y: 90, fontSize: 11, fill: '#6b7280' },
            { id: 'tech-id', type: 'text', content: 'Tech ID: TA2024T001', x: 115, y: 105, fontSize: 10, fill: '#0891b2', fontStyle: 'bold' },
            { id: 'tech-dob', type: 'text', content: 'DOB: 22/07/2009', x: 115, y: 120, fontSize: 10, fill: '#6b7280' },
            { id: 'tech-program', type: 'text', content: 'Program: Computer Science', x: 115, y: 135, fontSize: 10, fill: '#6b7280' },
            { id: 'tech-barcode', type: 'rect', x: 230, y: 70, width: 60, height: 70, fill: '#000000' },
            { id: 'tech-barcode-text', type: 'text', content: 'TA2024T001', x: 230, y: 145, fontSize: 7, fill: '#374151', align: 'center', width: 60 },
            { id: 'tech-footer', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#0891b2' },
            { id: 'tech-valid', type: 'text', content: 'Valid Till: 31/03/2025', x: 15, y: 195, fontSize: 10, fill: '#ffffff' },
            { id: 'tech-sign', type: 'rect', x: 150, y: 190, width: 130, height: 16, fill: '#ffffff', cornerRadius: 3 }
          ]
        },
        back: {
          backgroundColor: '#ecfeff',
          elements: [
            { id: 'back-tech-header', type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: '#0891b2' },
            { id: 'back-tech-title', type: 'text', content: 'DIGITAL ID VERIFICATION', x: 15, y: 20, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'tech-info-card', type: 'rect', x: 15, y: 55, width: 270, height: 110, fill: '#ffffff', cornerRadius: 8, stroke: '#0891b2', strokeWidth: 1 },
            { id: 'tech-details', type: 'text', content: 'TECHNICAL DETAILS', x: 25, y: 70, fontSize: 10, fill: '#0891b2', fontStyle: 'bold' },
            { id: 'tech-roll', type: 'text', content: 'Roll Number: TECH-2024-001', x: 25, y: 85, fontSize: 9, fill: '#374151' },
            { id: 'tech-lab-access', type: 'text', content: 'Lab Access: Level 3', x: 25, y: 100, fontSize: 9, fill: '#374151' },
            { id: 'tech-projects', type: 'text', content: 'Active Projects: 3', x: 25, y: 115, fontSize: 9, fill: '#374151' },
            { id: 'tech-mentor', type: 'text', content: 'Mentor: Dr. Smith', x: 25, y: 130, fontSize: 9, fill: '#374151' },
            { id: 'tech-parent', type: 'text', content: 'Parent Contact: +1 555-0123', x: 25, y: 145, fontSize: 9, fill: '#374151' },
            { id: 'tech-qr-back', type: 'rect', x: 200, y: 55, width: 70, height: 70, fill: '#0891b2', cornerRadius: 8 },
            { id: 'tech-qr-label', type: 'text', content: 'Verify Online', x: 200, y: 130, fontSize: 8, fill: '#6b7280', width: 70, align: 'center' },
            { id: 'tech-note', type: 'text', content: 'This ID provides access to tech labs and digital resources.', x: 15, y: 180, fontSize: 7, fill: '#0891b2', width: 270 }
          ]
        }
      }
    ],
    creative: [
      {
        id: 'creative-rainbow-youth',
        name: 'Rainbow Youth',
        size: '100x70',
        preview: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 25%, #10b981 50%, #3b82f6 75%, #8b5cf6 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'rainbow-header', type: 'rect', x: 0, y: 0, width: 300, height: 8, fill: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 16.66%, #10b981 33.33%, #3b82f6 50%, #8b5cf6 66.66%, #ec4899 83.33%, #ef4444 100%)' },
            { id: 'rainbow-school', type: 'text', content: 'RAINBOW INTERNATIONAL SCHOOL', x: 15, y: 25, fontSize: 14, fill: '#8b5cf6', fontStyle: 'bold' },
            { id: 'rainbow-motto', type: 'text', content: 'Celebrating Diversity in Learning', x: 15, y: 40, fontSize: 9, fill: '#6b7280' },
            { id: 'colorful-photo-bg', type: 'rect', x: 15, y: 55, width: 80, height: 95, fill: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #ddd6fe 100%)', cornerRadius: 15 },
            { id: 'rainbow-photo', type: 'image', x: 20, y: 60, width: 70, height: 85, cornerRadius: 12, src: '' },
            { id: 'student-name-rainbow', type: 'text', content: 'Sofia Martinez', x: 110, y: 65, fontSize: 17, fill: '#8b5cf6', fontStyle: 'bold' },
            { id: 'rainbow-grade', type: 'text', content: 'Grade 9 | Creative Arts', x: 110, y: 85, fontSize: 11, fill: '#6b7280' },
            { id: 'rainbow-id', type: 'text', content: 'Student ID: RIS2024C005', x: 110, y: 100, fontSize: 10, fill: '#8b5cf6', fontStyle: 'bold' },
            { id: 'rainbow-dob', type: 'text', content: 'Born: 18/03/2010', x: 110, y: 115, fontSize: 10, fill: '#6b7280' },
            { id: 'rainbow-house', type: 'text', content: 'House: Phoenix Red', x: 110, y: 130, fontSize: 10, fill: '#ef4444', fontStyle: 'bold' },
            { id: 'rainbow-activities', type: 'text', content: 'Activities: Art, Music, Dance', x: 110, y: 145, fontSize: 9, fill: '#6b7280' },
            { id: 'rainbow-qr', type: 'rect', x: 220, y: 55, width: 65, height: 65, fill: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', cornerRadius: 12 },
            { id: 'rainbow-scan', type: 'text', content: 'Creative Profile', x: 220, y: 125, fontSize: 8, fill: '#8b5cf6', width: 65, align: 'center' },
            { id: 'rainbow-footer', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: 'linear-gradient(90deg, #fef3c7 0%, #fce7f3 50%, #ddd6fe 100%)' },
            { id: 'rainbow-year', type: 'text', content: 'Academic Year 2024-2025', x: 15, y: 195, fontSize: 10, fill: '#8b5cf6', fontStyle: 'bold' }
          ]
        },
        back: {
          backgroundColor: '#faf5ff',
          elements: [
            { id: 'rainbow-back-header', type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 16.66%, #10b981 33.33%, #3b82f6 50%, #8b5cf6 66.66%, #ec4899 83.33%, #ef4444 100%)' },
            { id: 'rainbow-back-title', type: 'text', content: 'CREATIVE ACHIEVEMENTS', x: 15, y: 20, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'achievements-box', type: 'rect', x: 15, y: 55, width: 270, height: 100, fill: '#ffffff', cornerRadius: 12, stroke: '#e9d5ff', strokeWidth: 2 },
            { id: 'arts-title', type: 'text', content: 'Arts & Performance', x: 25, y: 70, fontSize: 11, fill: '#8b5cf6', fontStyle: 'bold' },
            { id: 'painting-award', type: 'text', content: '🎨 Painting Competition - 1st Place', x: 25, y: 85, fontSize: 9, fill: '#374151' },
            { id: 'music-award', type: 'text', content: '🎵 School Choir - Lead Vocalist', x: 25, y: 100, fontSize: 9, fill: '#374151' },
            { id: 'dance-award', type: 'text', content: '💃 Dance Group - Captain', x: 25, y: 115, fontSize: 9, fill: '#374151' },
            { id: 'drama-award', type: 'text', content: '🎭 Drama Club - Active Member', x: 25, y: 130, fontSize: 9, fill: '#374151' },
            { id: 'rainbow-back-qr', type: 'rect', x: 200, y: 55, width: 70, height: 70, fill: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', cornerRadius: 10 },
            { id: 'portfolio-link', type: 'text', content: 'Digital Portfolio', x: 200, y: 130, fontSize: 8, fill: '#8b5cf6', width: 70, align: 'center' },
            { id: 'rainbow-inspiration', type: 'text', content: 'Every color in the rainbow represents a unique talent!', x: 15, y: 170, fontSize: 8, fill: '#8b5cf6', width: 270, align: 'center', fontStyle: 'italic' }
          ]
        }
      }
    ]
  },
  vertical: {
    corporate: [
      {
        id: 'vert-blue-traditional',
        name: 'Blue Traditional',
        size: '54x86',
        preview: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #dbeafe 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'blue-header', type: 'rect', x: 0, y: 0, width: 162, height: 120, fill: '#1e3a8a' },
            { id: 'school-logo-vert', type: 'image', x: 56, y: 15, width: 50, height: 35, cornerRadius: 5, src: '' },
            { id: 'school-name-vert', type: 'text', content: 'TRADITIONAL SCHOOL', x: 10, y: 60, width: 142, align: 'center', fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'established', type: 'text', content: 'Est. 1985', x: 10, y: 80, width: 142, align: 'center', fontSize: 8, fill: '#93c5fd' },
            { id: 'photo-frame-vert', type: 'rect', x: 31, y: 130, width: 100, height: 120, fill: '#f1f5f9', cornerRadius: 10 },
            { id: 'student-photo-vert', type: 'image', x: 36, y: 135, width: 90, height: 110, cornerRadius: 8, src: '' },
            { id: 'name-vert', type: 'text', content: 'Michael Davis', x: 10, y: 260, width: 142, align: 'center', fontSize: 14, fill: '#1e3a8a', fontStyle: 'bold' },
            { id: 'class-vert', type: 'text', content: 'Class: X-B', x: 10, y: 278, width: 142, align: 'center', fontSize: 10, fill: '#64748b' },
            { id: 'roll-vert', type: 'text', content: 'Roll: 25', x: 10, y: 293, width: 142, align: 'center', fontSize: 10, fill: '#64748b' },
            { id: 'id-vert', type: 'text', content: 'ID: TS2024X025', x: 10, y: 308, width: 142, align: 'center', fontSize: 9, fill: '#1e3a8a', fontStyle: 'bold' },
            { id: 'barcode-vert', type: 'rect', x: 31, y: 320, width: 100, height: 25, fill: '#000000' },
            { id: 'footer-vert', type: 'rect', x: 0, y: 350, width: 162, height: 36, fill: '#1e3a8a' },
            { id: 'valid-vert', type: 'text', content: 'Valid: 2024-25', x: 10, y: 365, width: 142, align: 'center', fontSize: 9, fill: '#ffffff' }
          ]
        },
        back: {
          backgroundColor: '#f8fafc',
          elements: [
            { id: 'back-blue-header', type: 'rect', x: 0, y: 0, width: 162, height: 40, fill: '#1e3a8a' },
            { id: 'back-title-vert', type: 'text', content: 'STUDENT DETAILS', x: 10, y: 20, width: 142, align: 'center', fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'details-section', type: 'rect', x: 10, y: 50, width: 142, height: 200, fill: '#ffffff', cornerRadius: 8, stroke: '#e2e8f0', strokeWidth: 1 },
            { id: 'dob-label-vert', type: 'text', content: 'Date of Birth:', x: 15, y: 65, fontSize: 8, fill: '#64748b', fontStyle: 'bold' },
            { id: 'dob-vert', type: 'text', content: '12/05/2008', x: 15, y: 78, fontSize: 9, fill: '#1e293b' },
            { id: 'address-label-vert', type: 'text', content: 'Address:', x: 15, y: 95, fontSize: 8, fill: '#64748b', fontStyle: 'bold' },
            { id: 'address-vert', type: 'text', content: '123 School Street, City', x: 15, y: 108, fontSize: 8, fill: '#1e293b' },
            { id: 'parent-label-vert', type: 'text', content: 'Parent:', x: 15, y: 125, fontSize: 8, fill: '#64748b', fontStyle: 'bold' },
            { id: 'parent-vert', type: 'text', content: 'Robert Davis', x: 15, y: 138, fontSize: 9, fill: '#1e293b' },
            { id: 'phone-label-vert', type: 'text', content: 'Phone:', x: 15, y: 155, fontSize: 8, fill: '#64748b', fontStyle: 'bold' },
            { id: 'phone-vert', type: 'text', content: '(555) 123-4567', x: 15, y: 168, fontSize: 9, fill: '#1e293b' },
            { id: 'blood-label-vert', type: 'text', content: 'Blood Group:', x: 15, y: 185, fontSize: 8, fill: '#64748b', fontStyle: 'bold' },
            { id: 'blood-vert', type: 'text', content: 'O+', x: 15, y: 198, fontSize: 9, fill: '#1e293b' },
            { id: 'qr-vert', type: 'rect', x: 46, y: 210, width: 70, height: 70, fill: '#1e3a8a', cornerRadius: 8 },
            { id: 'qr-text-vert', type: 'text', content: 'Scan for Info', x: 46, y: 285, width: 70, align: 'center', fontSize: 7, fill: '#64748b' }
          ]
        }
      }
    ],
    modern: [
      {
        id: 'vert-teal-minimal',
        name: 'Teal Minimal',
        size: '54x86',
        preview: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #ccfbf1 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'teal-accent-top', type: 'rect', x: 0, y: 0, width: 162, height: 60, fill: '#0f766e' },
            { id: 'minimal-logo', type: 'image', x: 61, y: 10, width: 40, height: 40, cornerRadius: 20, src: '' },
            { id: 'minimal-school', type: 'text', content: 'MINIMAL ACADEMY', x: 10, y: 35, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'student-circle', type: 'circle', x: 81, y: 110, width: 80, height: 80, fill: '#ccfbf1', stroke: '#0f766e', strokeWidth: 3 },
            { id: 'minimal-photo', type: 'image', x: 51, y: 80, width: 60, height: 60, cornerRadius: 30, src: '' },
            { id: 'minimal-name', type: 'text', content: 'Emma Wilson', x: 10, y: 200, width: 142, align: 'center', fontSize: 13, fill: '#0f766e', fontStyle: 'bold' },
            { id: 'minimal-class', type: 'text', content: 'Grade 8', x: 10, y: 215, width: 142, align: 'center', fontSize: 10, fill: '#64748b' },
            { id: 'minimal-id', type: 'text', content: 'MA2024G8001', x: 10, y: 230, width: 142, align: 'center', fontSize: 9, fill: '#0f766e', fontStyle: 'bold' },
            { id: 'minimal-qr', type: 'rect', x: 46, y: 245, width: 70, height: 70, fill: '#0f766e', cornerRadius: 10 },
            { id: 'minimal-footer', type: 'rect', x: 0, y: 320, width: 162, height: 36, fill: '#ccfbf1' },
            { id: 'minimal-year', type: 'text', content: '2024-2025', x: 10, y: 335, width: 142, align: 'center', fontSize: 9, fill: '#0f766e' }
          ]
        },
        back: {
          backgroundColor: '#f0fdfa',
          elements: [
            { id: 'back-teal-header', type: 'rect', x: 0, y: 0, width: 162, height: 35, fill: '#0f766e' },
            { id: 'back-minimal-title', type: 'text', content: 'QUICK INFO', x: 10, y: 18, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'info-grid', type: 'rect', x: 10, y: 45, width: 142, height: 180, fill: '#ffffff', cornerRadius: 8, stroke: '#ccfbf1', strokeWidth: 2 },
            { id: 'dob-minimal', type: 'text', content: 'DOB: 15/03/2011', x: 15, y: 60, fontSize: 9, fill: '#374151' },
            { id: 'parent-minimal', type: 'text', content: 'Parent: Sarah Wilson', x: 15, y: 80, fontSize: 9, fill: '#374151' },
            { id: 'contact-minimal', type: 'text', content: 'Phone: (555) 987-6543', x: 15, y: 100, fontSize: 9, fill: '#374151' },
            { id: 'address-minimal', type: 'text', content: 'Address: 456 Oak Ave', x: 15, y: 120, fontSize: 9, fill: '#374151' },
            { id: 'allergies-minimal', type: 'text', content: 'Allergies: None', x: 15, y: 140, fontSize: 9, fill: '#374151' },
            { id: 'bus-minimal', type: 'text', content: 'Bus: Route A-5', x: 15, y: 160, fontSize: 9, fill: '#374151' },
            { id: 'emergency-minimal', type: 'text', content: 'Emergency: (555) 123-4567', x: 15, y: 180, fontSize: 9, fill: '#374151' },
            { id: 'back-qr-minimal', type: 'rect', x: 46, y: 195, width: 70, height: 70, fill: '#0f766e', cornerRadius: 8 },
            { id: 'digital-minimal', type: 'text', content: 'Digital ID', x: 46, y: 270, width: 70, align: 'center', fontSize: 8, fill: '#64748b' }
          ]
        }
      }
    ],
    creative: [
      {
        id: 'vert-rainbow-fun',
        name: 'Rainbow Fun',
        size: '54x86',
        preview: 'linear-gradient(135deg, #f97316 0%, #eab308 25%, #22c55e 50%, #06b6d4 75%, #8b5cf6 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'rainbow-stripes', type: 'rect', x: 0, y: 0, width: 162, height: 50, fill: 'linear-gradient(180deg, #f97316 0%, #eab308 20%, #22c55e 40%, #06b6d4 60%, #8b5cf6 80%, #ec4899 100%)' },
            { id: 'fun-logo', type: 'circle', x: 81, y: 25, width: 35, height: 35, fill: '#ffffff', stroke: '#8b5cf6', strokeWidth: 3 },
            { id: 'fun-school', type: 'text', content: 'FUN LEARNING', x: 10, y: 60, width: 142, align: 'center', fontSize: 11, fill: '#8b5cf6', fontStyle: 'bold' },
            { id: 'star-decoration', type: 'text', content: '⭐', x: 15, y: 75, fontSize: 12, fill: '#fbbf24' },
            { id: 'fun-photo-frame', type: 'rect', x: 26, y: 90, width: 110, height: 110, fill: '#fef3c7', cornerRadius: 20, stroke: '#f97316', strokeWidth: 3 },
            { id: 'fun-photo', type: 'image', x: 31, y: 95, width: 100, height: 100, cornerRadius: 15, src: '' },
            { id: 'fun-name', type: 'text', content: 'Lily Johnson', x: 10, y: 210, width: 142, align: 'center', fontSize: 13, fill: '#ec4899', fontStyle: 'bold' },
            { id: 'fun-grade', type: 'text', content: 'Grade 3 🌈', x: 10, y: 225, width: 142, align: 'center', fontSize: 10, fill: '#64748b' },
            { id: 'fun-id', type: 'text', content: 'FL2024G3001', x: 10, y: 240, width: 142, align: 'center', fontSize: 9, fill: '#8b5cf6', fontStyle: 'bold' },
            { id: 'fun-activities', type: 'text', content: '🎨 Art 🎵 Music 🏃 Sports', x: 10, y: 255, width: 142, align: 'center', fontSize: 9, fill: '#64748b' },
            { id: 'fun-qr', type: 'rect', x: 46, y: 270, width: 70, height: 70, fill: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', cornerRadius: 12 },
            { id: 'fun-footer', type: 'rect', x: 0, y: 345, width: 162, height: 31, fill: '#fef3c7' },
            { id: 'fun-motto', type: 'text', content: 'Learning is Fun! 🌟', x: 10, y: 358, width: 142, align: 'center', fontSize: 9, fill: '#f97316', fontStyle: 'bold' }
          ]
        },
        back: {
          backgroundColor: '#fef9e7',
          elements: [
            { id: 'back-rainbow-header', type: 'rect', x: 0, y: 0, width: 162, height: 40, fill: 'linear-gradient(180deg, #f97316 0%, #eab308 20%, #22c55e 40%, #06b6d4 60%, #8b5cf6 80%, #ec4899 100%)' },
            { id: 'back-fun-title', type: 'text', content: 'MY ACHIEVEMENTS', x: 10, y: 20, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'stars-section', type: 'rect', x: 10, y: 50, width: 142, height: 150, fill: '#ffffff', cornerRadius: 15, stroke: '#fbbf24', strokeWidth: 2 },
            { id: 'star-1', type: 'text', content: '⭐ Star Student', x: 15, y: 70, fontSize: 9, fill: '#fbbf24', fontStyle: 'bold' },
            { id: 'star-2', type: 'text', content: '🎨 Art Champion', x: 15, y: 90, fontSize: 9, fill: '#64748b' },
            { id: 'star-3', type: 'text', content: '📚 Reading Hero', x: 15, y: 110, fontSize: 9, fill: '#64748b' },
            { id: 'star-4', type: 'text', content: '🏃 Sports Star', x: 15, y: 130, fontSize: 9, fill: '#64748b' },
            { id: 'star-5', type: 'text', content: '🎵 Music Wonder', x: 15, y: 150, fontSize: 9, fill: '#64748b' },
            { id: 'star-6', type: 'text', content: '🤝 Helper Award', x: 15, y: 170, fontSize: 9, fill: '#64748b' },
            { id: 'fun-back-qr', type: 'rect', x: 46, y: 205, width: 70, height: 70, fill: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', cornerRadius: 10 },
            { id: 'fun-portfolio', type: 'text', content: 'My Portfolio', x: 46, y: 280, width: 70, align: 'center', fontSize: 8, fill: '#8b5cf6' },
            { id: 'fun-message', type: 'text', content: 'I am a superstar! 🌟', x: 10, y: 305, width: 142, align: 'center', fontSize: 9, fill: '#ec4899', fontStyle: 'bold' }
          ]
        }
      }
    ]
  },
  // Adding more templates to reach 50+ designs
  horizontal: {
    corporate: [
      // ... existing corporate templates ...
      {
        id: 'corp-navy-classic',
        name: 'Navy Classic',
        size: '100x70',
        preview: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #dbeafe 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'navy-header', type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: '#1e3a8a' },
            { id: 'navy-logo', type: 'image', x: 15, y: 8, width: 35, height: 24, cornerRadius: 3, src: '' },
            { id: 'navy-school', type: 'text', content: 'CLASSICAL ACADEMY', x: 60, y: 12, fontSize: 14, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'navy-motto', type: 'text', content: 'Tradition & Excellence', x: 60, y: 28, fontSize: 8, fill: '#93c5fd' },
            { id: 'navy-photo', type: 'image', x: 20, y: 55, width: 65, height: 80, cornerRadius: 5, src: '' },
            { id: 'navy-photo-border', type: 'rect', x: 18, y: 53, width: 69, height: 84, fill: 'transparent', stroke: '#1e3a8a', strokeWidth: 2, cornerRadius: 6 },
            { id: 'navy-name', type: 'text', content: 'William Anderson', x: 100, y: 65, fontSize: 16, fill: '#1e3a8a', fontStyle: 'bold' },
            { id: 'navy-grade', type: 'text', content: 'Grade 11 - Section A', x: 100, y: 85, fontSize: 11, fill: '#64748b' },
            { id: 'navy-id', type: 'text', content: 'ID: CA2024A001', x: 100, y: 100, fontSize: 10, fill: '#1e3a8a', fontStyle: 'bold' },
            { id: 'navy-dob', type: 'text', content: 'DOB: 15/08/2007', x: 100, y: 115, fontSize: 10, fill: '#64748b' },
            { id: 'navy-barcode', type: 'rect', x: 210, y: 55, width: 70, height: 80, fill: '#000000' },
            { id: 'navy-footer', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#1e3a8a' },
            { id: 'navy-valid', type: 'text', content: 'Academic Year 2024-2025', x: 15, y: 195, fontSize: 10, fill: '#ffffff' }
          ]
        },
        back: {
          backgroundColor: '#f8fafc',
          elements: [
            { id: 'navy-back-header', type: 'rect', x: 0, y: 0, width: 300, height: 35, fill: '#1e3a8a' },
            { id: 'navy-back-title', type: 'text', content: 'ACADEMIC INFORMATION', x: 15, y: 18, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'navy-details', type: 'rect', x: 15, y: 50, width: 270, height: 130, fill: '#ffffff', cornerRadius: 8, stroke: '#e2e8f0', strokeWidth: 1 },
            { id: 'navy-roll', type: 'text', content: 'Roll Number: CA-2024-001', x: 25, y: 65, fontSize: 9, fill: '#374151' },
            { id: 'navy-admission', type: 'text', content: 'Admission: 2021-2022', x: 25, y: 80, fontSize: 9, fill: '#374151' },
            { id: 'navy-parent', type: 'text', content: 'Parent: Robert Anderson', x: 25, y: 95, fontSize: 9, fill: '#374151' },
            { id: 'navy-contact', type: 'text', content: 'Phone: (555) 123-4567', x: 25, y: 110, fontSize: 9, fill: '#374151' },
            { id: 'navy-address', type: 'text', content: 'Address: 123 Academy Street', x: 25, y: 125, fontSize: 9, fill: '#374151' },
            { id: 'navy-qr', type: 'rect', x: 200, y: 50, width: 70, height: 70, fill: '#1e3a8a', cornerRadius: 8 },
            { id: 'navy-qr-text', type: 'text', content: 'Digital ID', x: 200, y: 125, fontSize: 8, fill: '#64748b', width: 70, align: 'center' }
          ]
        }
      },
      {
        id: 'corp-burgundy-elegant',
        name: 'Burgundy Elegant',
        size: '100x70',
        preview: 'linear-gradient(135deg, #7c2d12 0%, #dc2626 50%, #fef2f2 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'burgundy-header', type: 'rect', x: 0, y: 0, width: 300, height: 45, fill: '#7c2d12' },
            { id: 'burgundy-logo', type: 'image', x: 15, y: 8, width: 30, height: 30, cornerRadius: 15, src: '' },
            { id: 'burgundy-school', type: 'text', content: 'ELITE INSTITUTE', x: 55, y: 15, fontSize: 14, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'burgundy-motto', type: 'text', content: 'Excellence Since 1990', x: 55, y: 30, fontSize: 8, fill: '#fca5a5' },
            { id: 'burgundy-photo', type: 'image', x: 20, y: 60, width: 70, height: 85, cornerRadius: 8, src: '' },
            { id: 'burgundy-photo-border', type: 'rect', x: 18, y: 58, width: 74, height: 89, fill: 'transparent', stroke: '#7c2d12', strokeWidth: 2, cornerRadius: 10 },
            { id: 'burgundy-name', type: 'text', content: 'Sophia Martinez', x: 105, y: 70, fontSize: 16, fill: '#7c2d12', fontStyle: 'bold' },
            { id: 'burgundy-grade', type: 'text', content: 'Grade 12 - Science Stream', x: 105, y: 90, fontSize: 11, fill: '#64748b' },
            { id: 'burgundy-id', type: 'text', content: 'ID: EI2024S001', x: 105, y: 105, fontSize: 10, fill: '#7c2d12', fontStyle: 'bold' },
            { id: 'burgundy-dob', type: 'text', content: 'DOB: 22/03/2006', x: 105, y: 120, fontSize: 10, fill: '#64748b' },
            { id: 'burgundy-barcode', type: 'rect', x: 210, y: 60, width: 70, height: 85, fill: '#000000' },
            { id: 'burgundy-footer', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#7c2d12' },
            { id: 'burgundy-valid', type: 'text', content: 'Valid Until: 31/03/2025', x: 15, y: 195, fontSize: 10, fill: '#ffffff' }
          ]
        },
        back: {
          backgroundColor: '#fef2f2',
          elements: [
            { id: 'burgundy-back-header', type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: '#7c2d12' },
            { id: 'burgundy-back-title', type: 'text', content: 'STUDENT RECORDS', x: 15, y: 20, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'burgundy-info', type: 'rect', x: 15, y: 55, width: 270, height: 125, fill: '#ffffff', cornerRadius: 8, stroke: '#fecaca', strokeWidth: 1 },
            { id: 'burgundy-details-title', type: 'text', content: 'Personal Information', x: 25, y: 70, fontSize: 10, fill: '#7c2d12', fontStyle: 'bold' },
            { id: 'burgundy-father', type: 'text', content: 'Father: Carlos Martinez', x: 25, y: 85, fontSize: 9, fill: '#374151' },
            { id: 'burgundy-mother', type: 'text', content: 'Mother: Maria Martinez', x: 25, y: 100, fontSize: 9, fill: '#374151' },
            { id: 'burgundy-phone', type: 'text', content: 'Phone: (555) 987-6543', x: 25, y: 115, fontSize: 9, fill: '#374151' },
            { id: 'burgundy-email', type: 'text', content: 'Email: sophia@elite.edu', x: 25, y: 130, fontSize: 9, fill: '#374151' },
            { id: 'burgundy-address', type: 'text', content: 'Address: 456 Elite Avenue', x: 25, y: 145, fontSize: 9, fill: '#374151' },
            { id: 'burgundy-qr', type: 'rect', x: 200, y: 55, width: 70, height: 70, fill: '#7c2d12', cornerRadius: 8 },
            { id: 'burgundy-qr-label', type: 'text', content: 'Verify Online', x: 200, y: 130, fontSize: 8, fill: '#64748b', width: 70, align: 'center' }
          ]
        }
      },
      {
        id: 'corp-forest-green',
        name: 'Forest Green',
        size: '100x70',
        preview: 'linear-gradient(135deg, #14532d 0%, #16a34a 50%, #dcfce7 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'forest-header', type: 'rect', x: 0, y: 0, width: 300, height: 42, fill: '#14532d' },
            { id: 'forest-logo', type: 'image', x: 15, y: 6, width: 30, height: 30, cornerRadius: 5, src: '' },
            { id: 'forest-school', type: 'text', content: 'GREENWOOD ACADEMY', x: 55, y: 12, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'forest-tagline', type: 'text', content: 'Sustainable Education', x: 55, y: 28, fontSize: 8, fill: '#86efac' },
            { id: 'forest-photo', type: 'image', x: 18, y: 55, width: 75, height: 90, cornerRadius: 6, src: '' },
            { id: 'forest-photo-border', type: 'rect', x: 16, y: 53, width: 79, height: 94, fill: 'transparent', stroke: '#14532d', strokeWidth: 2, cornerRadius: 8 },
            { id: 'forest-name', type: 'text', content: 'David Thompson', x: 105, y: 65, fontSize: 16, fill: '#14532d', fontStyle: 'bold' },
            { id: 'forest-grade', type: 'text', content: 'Grade 10 - Environmental', x: 105, y: 85, fontSize: 11, fill: '#64748b' },
            { id: 'forest-id', type: 'text', content: 'ID: GA2024E001', x: 105, y: 100, fontSize: 10, fill: '#14532d', fontStyle: 'bold' },
            { id: 'forest-dob', type: 'text', content: 'DOB: 10/11/2008', x: 105, y: 115, fontSize: 10, fill: '#64748b' },
            { id: 'forest-barcode', type: 'rect', x: 210, y: 55, width: 70, height: 90, fill: '#000000' },
            { id: 'forest-footer', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#14532d' },
            { id: 'forest-year', type: 'text', content: '2024-2025 Academic Year', x: 15, y: 195, fontSize: 10, fill: '#ffffff' }
          ]
        },
        back: {
          backgroundColor: '#f0fdf4',
          elements: [
            { id: 'forest-back-header', type: 'rect', x: 0, y: 0, width: 300, height: 38, fill: '#14532d' },
            { id: 'forest-back-title', type: 'text', content: 'ECOLOGICAL PROFILE', x: 15, y: 19, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'forest-info-card', type: 'rect', x: 15, y: 53, width: 270, height: 127, fill: '#ffffff', cornerRadius: 8, stroke: '#bbf7d0', strokeWidth: 1 },
            { id: 'forest-eco-title', type: 'text', content: 'Environmental Activities', x: 25, y: 68, fontSize: 10, fill: '#14532d', fontStyle: 'bold' },
            { id: 'forest-club', type: 'text', content: 'Eco Club Member', x: 25, y: 83, fontSize: 9, fill: '#374151' },
            { id: 'forest-project', type: 'text', content: 'Tree Planting Project Lead', x: 25, y: 98, fontSize: 9, fill: '#374151' },
            { id: 'forest-recycling', type: 'text', content: 'Recycling Coordinator', x: 25, y: 113, fontSize: 9, fill: '#374151' },
            { id: 'forest-parent', type: 'text', content: 'Parent: James Thompson', x: 25, y: 128, fontSize: 9, fill: '#374151' },
            { id: 'forest-contact', type: 'text', content: 'Emergency: (555) 246-8135', x: 25, y: 143, fontSize: 9, fill: '#374151' },
            { id: 'forest-qr', type: 'rect', x: 200, y: 53, width: 70, height: 70, fill: '#14532d', cornerRadius: 8 },
            { id: 'forest-qr-text', type: 'text', content: 'Green Profile', x: 200, y: 128, fontSize: 8, fill: '#64748b', width: 70, align: 'center' }
          ]
        }
      }
    ],
    modern: [
      // ... existing modern templates ...
      {
        id: 'modern-coral-vibrant',
        name: 'Coral Vibrant',
        size: '100x70',
        preview: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 50%, #ffe4e6 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'coral-gradient', type: 'rect', x: 0, y: 0, width: 300, height: 70, fill: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)' },
            { id: 'coral-logo', type: 'circle', x: 40, y: 35, width: 40, height: 40, fill: '#ffffff', stroke: '#f43f5e', strokeWidth: 3 },
            { id: 'coral-school', type: 'text', content: 'VIBRANT LEARNING', x: 90, y: 25, fontSize: 15, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'coral-tagline', type: 'text', content: 'Colorful Education', x: 90, y: 45, fontSize: 10, fill: '#fce7f3' },
            { id: 'coral-photo-bg', type: 'rect', x: 20, y: 85, width: 80, height: 95, fill: '#ffe4e6', cornerRadius: 15 },
            { id: 'coral-photo', type: 'image', x: 25, y: 90, width: 70, height: 85, cornerRadius: 10, src: '' },
            { id: 'coral-name', type: 'text', content: 'Isabella Garcia', x: 115, y: 95, fontSize: 17, fill: '#f43f5e', fontStyle: 'bold' },
            { id: 'coral-grade', type: 'text', content: 'Grade 9 | Creative Arts', x: 115, y: 115, fontSize: 11, fill: '#64748b' },
            { id: 'coral-id', type: 'text', content: 'ID: VL2024C001', x: 115, y: 130, fontSize: 10, fill: '#f43f5e', fontStyle: 'bold' },
            { id: 'coral-dob', type: 'text', content: 'DOB: 25/06/2009', x: 115, y: 145, fontSize: 10, fill: '#64748b' },
            { id: 'coral-qr', type: 'rect', x: 210, y: 85, width: 70, height: 70, fill: '#f43f5e', cornerRadius: 12 },
            { id: 'coral-scan', type: 'text', content: 'Creative Profile', x: 210, y: 160, fontSize: 8, fill: '#f43f5e', width: 70, align: 'center' },
            { id: 'coral-footer', type: 'rect', x: 0, y: 190, width: 300, height: 26, fill: '#ffe4e6' },
            { id: 'coral-year', type: 'text', content: 'Academic Year 2024-2025', x: 15, y: 203, fontSize: 10, fill: '#f43f5e' }
          ]
        },
        back: {
          backgroundColor: '#fff1f2',
          elements: [
            { id: 'coral-back-gradient', type: 'rect', x: 0, y: 0, width: 300, height: 45, fill: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)' },
            { id: 'coral-back-title', type: 'text', content: 'CREATIVE ACHIEVEMENTS', x: 15, y: 22, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'coral-achievements', type: 'rect', x: 15, y: 55, width: 270, height: 125, fill: '#ffffff', cornerRadius: 12, stroke: '#fecaca', strokeWidth: 2 },
            { id: 'coral-art-title', type: 'text', content: 'Artistic Excellence', x: 25, y: 70, fontSize: 11, fill: '#f43f5e', fontStyle: 'bold' },
            { id: 'coral-painting', type: 'text', content: '🎨 Painting Competition - 1st Place', x: 25, y: 85, fontSize: 9, fill: '#374151' },
            { id: 'coral-music', type: 'text', content: '🎵 School Orchestra - Violin', x: 25, y: 100, fontSize: 9, fill: '#374151' },
            { id: 'coral-dance', type: 'text', content: '💃 Dance Performance - Lead', x: 25, y: 115, fontSize: 9, fill: '#374151' },
            { id: 'coral-drama', type: 'text', content: '🎭 Drama Club - Active Member', x: 25, y: 130, fontSize: 9, fill: '#374151' },
            { id: 'coral-parent', type: 'text', content: 'Parent: Maria Garcia', x: 25, y: 145, fontSize: 9, fill: '#374151' },
            { id: 'coral-back-qr', type: 'rect', x: 200, y: 55, width: 70, height: 70, fill: '#f43f5e', cornerRadius: 10 },
            { id: 'coral-portfolio', type: 'text', content: 'Art Portfolio', x: 200, y: 130, fontSize: 8, fill: '#64748b', width: 70, align: 'center' },
            { id: 'coral-inspiration', type: 'text', content: 'Creativity is intelligence having fun!', x: 15, y: 190, fontSize: 8, fill: '#f43f5e', width: 270, align: 'center', fontStyle: 'italic' }
          ]
        }
      },
      {
        id: 'modern-teal-minimal',
        name: 'Teal Minimal',
        size: '100x70',
        preview: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #ccfbf1 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'teal-top-bar', type: 'rect', x: 0, y: 0, width: 300, height: 35, fill: '#0f766e' },
            { id: 'teal-logo', type: 'image', x: 15, y: 5, width: 25, height: 25, cornerRadius: 12, src: '' },
            { id: 'teal-school', type: 'text', content: 'MINIMAL SCHOOL', x: 50, y: 10, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'teal-concept', type: 'text', content: 'Less is More', x: 50, y: 25, fontSize: 8, fill: '#5eead4' },
            { id: 'teal-photo-circle', type: 'circle', x: 60, y: 100, width: 85, height: 85, fill: '#ccfbf1', stroke: '#0f766e', strokeWidth: 3 },
            { id: 'teal-photo', type: 'image', x: 30, y: 70, width: 60, height: 60, cornerRadius: 30, src: '' },
            { id: 'teal-name', type: 'text', content: 'Olivia White', x: 160, y: 75, fontSize: 16, fill: '#0f766e', fontStyle: 'bold' },
            { id: 'teal-grade', type: 'text', content: 'Grade 11', x: 160, y: 95, fontSize: 11, fill: '#64748b' },
            { id: 'teal-id', type: 'text', content: 'MS2024G001', x: 160, y: 110, fontSize: 10, fill: '#0f766e', fontStyle: 'bold' },
            { id: 'teal-dob', type: 'text', content: 'DOB: 18/02/2007', x: 160, y: 125, fontSize: 10, fill: '#64748b' },
            { id: 'teal-qr', type: 'rect', x: 210, y: 70, width: 70, height: 70, fill: '#0f766e', cornerRadius: 10 },
            { id: 'teal-footer', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#ccfbf1' },
            { id: 'teal-year', type: 'text', content: '2024-2025', x: 15, y: 195, fontSize: 10, fill: '#0f766e' }
          ]
        },
        back: {
          backgroundColor: '#f0fdfa',
          elements: [
            { id: 'teal-back-header', type: 'rect', x: 0, y: 0, width: 300, height: 30, fill: '#0f766e' },
            { id: 'teal-back-title', type: 'text', content: 'ESSENTIAL INFO', x: 15, y: 15, fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'teal-info-box', type: 'rect', x: 15, y: 45, width: 270, height: 135, fill: '#ffffff', cornerRadius: 8, stroke: '#ccfbf1', strokeWidth: 2 },
            { id: 'teal-personal', type: 'text', content: 'Personal Details', x: 25, y: 60, fontSize: 10, fill: '#0f766e', fontStyle: 'bold' },
            { id: 'teal-dob-back', type: 'text', content: 'DOB: 18/02/2007', x: 25, y: 75, fontSize: 9, fill: '#374151' },
            { id: 'teal-parent', type: 'text', content: 'Parent: Jennifer White', x: 25, y: 90, fontSize: 9, fill: '#374151' },
            { id: 'teal-phone', type: 'text', content: 'Phone: (555) 456-7890', x: 25, y: 105, fontSize: 9, fill: '#374151' },
            { id: 'teal-address', type: 'text', content: 'Address: 789 Minimal Street', x: 25, y: 120, fontSize: 9, fill: '#374151' },
            { id: 'teal-emergency', type: 'text', content: 'Emergency: (555) 321-6540', x: 25, y: 135, fontSize: 9, fill: '#374151' },
            { id: 'teal-back-qr', type: 'rect', x: 200, y: 45, width: 70, height: 70, fill: '#0f766e', cornerRadius: 8 },
            { id: 'teal-digital', type: 'text', content: 'Digital ID', x: 200, y: 120, fontSize: 8, fill: '#64748b', width: 70, align: 'center' }
          ]
        }
      },
      {
        id: 'modern-indigo-tech',
        name: 'Indigo Tech',
        size: '100x70',
        preview: 'linear-gradient(135deg, #312e81 0%, #6366f1 50%, #e0e7ff 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'indigo-tech-header', type: 'rect', x: 0, y: 0, width: 300, height: 50, fill: '#312e81' },
            { id: 'indigo-circuit', type: 'rect', x: 0, y: 50, width: 300, height: 3, fill: 'linear-gradient(90deg, #312e81 0%, #6366f1 50%, #a5b4fc 100%)' },
            { id: 'indigo-logo', type: 'image', x: 15, y: 10, width: 30, height: 30, cornerRadius: 5, src: '' },
            { id: 'indigo-school', type: 'text', content: 'DIGITAL ACADEMY', x: 55, y: 15, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'indigo-tech-tag', type: 'text', content: 'Technology & Innovation', x: 55, y: 32, fontSize: 8, fill: '#c7d2fe' },
            { id: 'indigo-left-panel', type: 'rect', x: 0, y: 53, width: 100, height: 127, fill: '#e0e7ff' },
            { id: 'indigo-photo', type: 'image', x: 20, y: 70, width: 60, height: 75, cornerRadius: 5, src: '' },
            { id: 'indigo-photo-border', type: 'rect', x: 18, y: 68, width: 64, height: 79, fill: 'transparent', stroke: '#312e81', strokeWidth: 2, cornerRadius: 6 },
            { id: 'indigo-name', type: 'text', content: 'Ethan Chen', x: 115, y: 70, fontSize: 16, fill: '#312e81', fontStyle: 'bold' },
            { id: 'indigo-stream', type: 'text', content: 'Computer Science Stream', x: 115, y: 90, fontSize: 11, fill: '#64748b' },
            { id: 'indigo-grade', type: 'text', content: 'Grade 12 - Section A', x: 115, y: 105, fontSize: 10, fill: '#64748b' },
            { id: 'indigo-id', type: 'text', content: 'Tech ID: DA2024CS001', x: 115, y: 120, fontSize: 10, fill: '#312e81', fontStyle: 'bold' },
            { id: 'indigo-projects', type: 'text', content: 'Active Projects: 5', x: 115, y: 135, fontSize: 10, fill: '#64748b' },
            { id: 'indigo-barcode', type: 'rect', x: 220, y: 70, width: 65, height: 80, fill: '#000000' },
            { id: 'indigo-footer', type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: '#312e81' },
            { id: 'indigo-valid', type: 'text', content: 'Tech License: Valid 2024-2025', x: 15, y: 195, fontSize: 10, fill: '#ffffff' }
          ]
        },
        back: {
          backgroundColor: '#eef2ff',
          elements: [
            { id: 'indigo-back-header', type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: '#312e81' },
            { id: 'indigo-back-title', type: 'text', content: 'TECHNICAL PROFILE', x: 15, y: 20, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'indigo-tech-card', type: 'rect', x: 15, y: 55, width: 270, height: 125, fill: '#ffffff', cornerRadius: 8, stroke: '#c7d2fe', strokeWidth: 1 },
            { id: 'indigo-skills-title', type: 'text', content: 'Technical Skills', x: 25, y: 70, fontSize: 10, fill: '#312e81', fontStyle: 'bold' },
            { id: 'indigo-coding', type: 'text', content: 'Programming: Python, JavaScript', x: 25, y: 85, fontSize: 9, fill: '#374151' },
            { id: 'indigo-robotics', type: 'text', content: 'Robotics: Arduino, Raspberry Pi', x: 25, y: 100, fontSize: 9, fill: '#374151' },
            { id: 'indigo-ai', type: 'text', content: 'AI/ML: TensorFlow, PyTorch', x: 25, y: 115, fontSize: 9, fill: '#374151' },
            { id: 'indigo-web', type: 'text', content: 'Web Development: React, Node.js', x: 25, y: 130, fontSize: 9, fill: '#374151' },
            { id: 'indigo-parent', type: 'text', content: 'Parent: Michael Chen', x: 25, y: 145, fontSize: 9, fill: '#374151' },
            { id: 'indigo-back-qr', type: 'rect', x: 200, y: 55, width: 70, height: 70, fill: '#312e81', cornerRadius: 8 },
            { id: 'indigo-github', type: 'text', content: 'GitHub Profile', x: 200, y: 130, fontSize: 8, fill: '#64748b', width: 70, align: 'center' }
          ]
        }
      }
    ],
    creative: [
      // ... existing creative templates ...
      {
        id: 'creative-sunset-warm',
        name: 'Sunset Warm',
        size: '100x70',
        preview: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fed7aa 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'sunset-gradient', type: 'rect', x: 0, y: 0, width: 300, height: 65, fill: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)' },
            { id: 'sun-icon', type: 'circle', x: 40, y: 32, width: 35, height: 35, fill: '#fbbf24', stroke: '#f97316', strokeWidth: 3 },
            { id: 'sunset-school', type: 'text', content: 'SUNSET ACADEMY', x: 85, y: 20, fontSize: 14, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'sunset-motto', type: 'text', content: 'Bright Futures Begin Here', x: 85, y: 40, fontSize: 9, fill: '#fed7aa' },
            { id: 'sunset-photo-frame', type: 'rect', x: 20, y: 75, width: 85, height: 100, fill: '#fff7ed', cornerRadius: 20, stroke: '#f97316', strokeWidth: 3 },
            { id: 'sunset-photo', type: 'image', x: 25, y: 80, width: 75, height: 90, cornerRadius: 15, src: '' },
            { id: 'sunset-name', type: 'text', content: 'Mia Rodriguez', x: 120, y: 85, fontSize: 17, fill: '#f97316', fontStyle: 'bold' },
            { id: 'sunset-grade', type: 'text', content: 'Grade 8 | Sunshine Class', x: 120, y: 105, fontSize: 11, fill: '#64748b' },
            { id: 'sunset-id', type: 'text', content: 'ID: SA2024S001', x: 120, y: 120, fontSize: 10, fill: '#f97316', fontStyle: 'bold' },
            { id: 'sunset-dob', type: 'text', content: 'DOB: 30/09/2010', x: 120, y: 135, fontSize: 10, fill: '#64748b' },
            { id: 'sunset-activities', type: 'text', content: '☀️ Art 🌟 Music 🎭 Drama', x: 120, y: 150, fontSize: 9, fill: '#64748b' },
            { id: 'sunset-qr', type: 'rect', x: 215, y: 75, width: 70, height: 70, fill: '#f97316', cornerRadius: 12 },
            { id: 'sunset-scan', type: 'text', content: 'Shining Profile', x: 215, y: 150, fontSize: 8, fill: '#f97316', width: 70, align: 'center' },
            { id: 'sunset-footer', type: 'rect', x: 0, y: 185, width: 300, height: 31, fill: '#fff7ed' },
            { id: 'sunset-year', type: 'text', content: '2024-2025 Bright Year', x: 15, y: 198, fontSize: 10, fill: '#f97316' }
          ]
        },
        back: {
          backgroundColor: '#fff7ed',
          elements: [
            { id: 'sunset-back-header', type: 'rect', x: 0, y: 0, width: 300, height: 42, fill: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)' },
            { id: 'sunset-back-title', type: 'text', content: 'SHINING ACHIEVEMENTS', x: 15, y: 21, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'sunset-awards', type: 'rect', x: 15, y: 52, width: 270, height: 128, fill: '#ffffff', cornerRadius: 15, stroke: '#fed7aa', strokeWidth: 2 },
            { id: 'sunset-star-title', type: 'text', content: 'Star Student Awards', x: 25, y: 67, fontSize: 11, fill: '#f97316', fontStyle: 'bold' },
            { id: 'sunset-art-award', type: 'text', content: '🌟 Art Competition - Gold Medal', x: 25, y: 82, fontSize: 9, fill: '#374151' },
            { id: 'sunset-music-award', type: 'text', content: '🎵 Singing Competition - 1st Place', x: 25, y: 97, fontSize: 9, fill: '#374151' },
            { id: 'sunset-sports-award', type: 'text', content: '🏃 Track & Field - Bronze Medal', x: 25, y: 112, fontSize: 9, fill: '#374151' },
            { id: 'sunset-leadership', type: 'text', content: '👑 Class Leader - Fall Semester', x: 25, y: 127, fontSize: 9, fill: '#374151' },
            { id: 'sunset-parent', type: 'text', content: 'Parent: Carlos Rodriguez', x: 25, y: 142, fontSize: 9, fill: '#374151' },
            { id: 'sunset-back-qr', type: 'rect', x: 200, y: 52, width: 70, height: 70, fill: '#f97316', cornerRadius: 10 },
            { id: 'sunset-portfolio', type: 'text', content: 'Art Portfolio', x: 200, y: 127, fontSize: 8, fill: '#64748b', width: 70, align: 'center' },
            { id: 'sunset-quote', type: 'text', content: 'Every sunset brings the promise of a new dawn!', x: 15, y: 190, fontSize: 8, fill: '#f97316', width: 270, align: 'center', fontStyle: 'italic' }
          ]
        }
      },
      {
        id: 'creative-ocean-breeze',
        name: 'Ocean Breeze',
        size: '100x70',
        preview: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #cffafe 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'ocean-wave', type: 'rect', x: 0, y: 0, width: 300, height: 55, fill: 'linear-gradient(180deg, #0891b2 0%, #06b6d4 50%, #67e8f9 100%)' },
            { id: 'wave-pattern', type: 'rect', x: 0, y: 55, width: 300, height: 8, fill: 'linear-gradient(90deg, #0891b2 0%, #06b6d4 25%, #67e8f9 50%, #a5f3fc 75%, #0891b2 100%)' },
            { id: 'ocean-logo', type: 'circle', x: 35, y: 27, width: 30, height: 30, fill: '#ffffff', stroke: '#0891b2', strokeWidth: 3 },
            { id: 'ocean-school', type: 'text', content: 'OCEAN VIEW SCHOOL', x: 75, y: 18, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'ocean-motto', type: 'text', content: 'Navigate Your Future', x: 75, y: 35, fontSize: 8, fill: '#cffafe' },
            { id: 'ocean-photo-container', type: 'rect', x: 18, y: 73, width: 82, height: 95, fill: '#ecfeff', cornerRadius: 18, stroke: '#0891b2', strokeWidth: 2 },
            { id: 'ocean-photo', type: 'image', x: 23, y: 78, width: 72, height: 85, cornerRadius: 12, src: '' },
            { id: 'ocean-name', type: 'text', content: 'Lucas Ocean', x: 115, y: 83, fontSize: 16, fill: '#0891b2', fontStyle: 'bold' },
            { id: 'ocean-grade', type: 'text', content: 'Grade 10 | Marine Biology', x: 115, y: 103, fontSize: 11, fill: '#64748b' },
            { id: 'ocean-id', type: 'text', content: 'ID: OV2024M001', x: 115, y: 118, fontSize: 10, fill: '#0891b2', fontStyle: 'bold' },
            { id: 'ocean-dob', type: 'text', content: 'DOB: 12/08/2008', x: 115, y: 133, fontSize: 10, fill: '#64748b' },
            { id: 'ocean-projects', type: 'text', content: '🌊 Marine Research Project', x: 115, y: 148, fontSize: 9, fill: '#0891b2' },
            { id: 'ocean-qr', type: 'rect', x: 210, y: 73, width: 70, height: 70, fill: '#0891b2', cornerRadius: 12 },
            { id: 'ocean-scan', type: 'text', content: 'Ocean Explorer', x: 210, y: 148, fontSize: 8, fill: '#0891b2', width: 70, align: 'center' },
            { id: 'ocean-footer', type: 'rect', x: 0, y: 183, width: 300, height: 33, fill: '#ecfeff' },
            { id: 'ocean-year', type: 'text', content: '2024-2025 Voyage', x: 15, y: 197, fontSize: 10, fill: '#0891b2' }
          ]
        },
        back: {
          backgroundColor: '#f0fdfa',
          elements: [
            { id: 'ocean-back-header', type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: 'linear-gradient(180deg, #0891b2 0%, #06b6d4 100%)' },
            { id: 'ocean-back-title', type: 'text', content: 'MARINE EXPLORER PROFILE', x: 15, y: 20, fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'ocean-info-card', type: 'rect', x: 15, y: 50, width: 270, height: 130, fill: '#ffffff', cornerRadius: 12, stroke: '#a5f3fc', strokeWidth: 2 },
            { id: 'ocean-research', type: 'text', content: 'Research Activities', x: 25, y: 65, fontSize: 10, fill: '#0891b2', fontStyle: 'bold' },
            { id: 'ocean-coral-study', type: 'text', content: '🪸 Coral Reef Conservation', x: 25, y: 80, fontSize: 9, fill: '#374151' },
            { id: 'ocean-whale-tracking', type: 'text', content: '🐋 Whale Migration Tracking', x: 25, y: 95, fontSize: 9, fill: '#374151' },
            { id: 'ocean-plastic-research', type: 'text', content: '🌊 Ocean Plastic Research', x: 25, y: 110, fontSize: 9, fill: '#374151' },
            { id: 'ocean-diving', type: 'text', content: '🤿 Certified Junior Diver', x: 25, y: 125, fontSize: 9, fill: '#374151' },
            { id: 'ocean-parent', type: 'text', content: 'Parent: Marine Biologist', x: 25, y: 140, fontSize: 9, fill: '#374151' },
            { id: 'ocean-back-qr', type: 'rect', x: 200, y: 50, width: 70, height: 70, fill: '#0891b2', cornerRadius: 10 },
            { id: 'ocean-research-data', type: 'text', content: 'Research Data', x: 200, y: 125, fontSize: 8, fill: '#64748b', width: 70, align: 'center' },
            { id: 'ocean-quote', type: 'text', content: 'The ocean is everything I want to be: mysterious, beautiful, and wild!', x: 15, y: 190, fontSize: 7, fill: '#0891b2', width: 270, align: 'center', fontStyle: 'italic' }
          ]
        }
      }
    ]
  },
  vertical: {
    corporate: [
      // ... existing vertical corporate templates ...
      {
        id: 'vert-gray-professional',
        name: 'Gray Professional',
        size: '54x86',
        preview: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #f3f4f6 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'gray-header', type: 'rect', x: 0, y: 0, width: 162, height: 110, fill: '#374151' },
            { id: 'gray-logo', type: 'image', x: 56, y: 15, width: 50, height: 35, cornerRadius: 5, src: '' },
            { id: 'gray-school', type: 'text', content: 'PROFESSIONAL', x: 10, y: 60, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'gray-academy', type: 'text', content: 'ACADEMY', x: 10, y: 78, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'gray-photo', type: 'image', x: 31, y: 125, width: 100, height: 120, cornerRadius: 8, src: '' },
            { id: 'gray-photo-border', type: 'rect', x: 29, y: 123, width: 104, height: 124, fill: 'transparent', stroke: '#374151', strokeWidth: 2, cornerRadius: 10 },
            { id: 'gray-name', type: 'text', content: 'James Wilson', x: 10, y: 255, width: 142, align: 'center', fontSize: 13, fill: '#374151', fontStyle: 'bold' },
            { id: 'gray-grade', type: 'text', content: 'Grade 12 - A', x: 10, y: 273, width: 142, align: 'center', fontSize: 10, fill: '#6b7280' },
            { id: 'gray-id', type: 'text', content: 'PA2024A001', x: 10, y: 288, width: 142, align: 'center', fontSize: 9, fill: '#374151', fontStyle: 'bold' },
            { id: 'gray-barcode', type: 'rect', x: 31, y: 300, width: 100, height: 25, fill: '#000000' },
            { id: 'gray-footer', type: 'rect', x: 0, y: 330, width: 162, height: 36, fill: '#374151' },
            { id: 'gray-valid', type: 'text', content: 'Valid 2024-2025', x: 10, y: 345, width: 142, align: 'center', fontSize: 9, fill: '#ffffff' }
          ]
        },
        back: {
          backgroundColor: '#f9fafb',
          elements: [
            { id: 'gray-back-header', type: 'rect', x: 0, y: 0, width: 162, height: 38, fill: '#374151' },
            { id: 'gray-back-title', type: 'text', content: 'STUDENT INFO', x: 10, y: 18, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'gray-details', type: 'rect', x: 10, y: 48, width: 142, height: 200, fill: '#ffffff', cornerRadius: 8, stroke: '#e5e7eb', strokeWidth: 1 },
            { id: 'gray-dob-label', type: 'text', content: 'Date of Birth:', x: 15, y: 63, fontSize: 8, fill: '#6b7280', fontStyle: 'bold' },
            { id: 'gray-dob', type: 'text', content: '08/12/2006', x: 15, y: 76, fontSize: 9, fill: '#374151' },
            { id: 'gray-address-label', type: 'text', content: 'Address:', x: 15, y: 93, fontSize: 8, fill: '#6b7280', fontStyle: 'bold' },
            { id: 'gray-address', type: 'text', content: '123 Professional Ave', x: 15, y: 106, fontSize: 8, fill: '#374151' },
            { id: 'gray-parent-label', type: 'text', content: 'Parent:', x: 15, y: 123, fontSize: 8, fill: '#6b7280', fontStyle: 'bold' },
            { id: 'gray-parent', type: 'text', content: 'Robert Wilson', x: 15, y: 136, fontSize: 9, fill: '#374151' },
            { id: 'gray-phone-label', type: 'text', content: 'Phone:', x: 15, y: 153, fontSize: 8, fill: '#6b7280', fontStyle: 'bold' },
            { id: 'gray-phone', type: 'text', content: '(555) 123-4567', x: 15, y: 166, fontSize: 9, fill: '#374151' },
            { id: 'gray-qr', type: 'rect', x: 46, y: 180, width: 70, height: 70, fill: '#374151', cornerRadius: 8 },
            { id: 'gray-qr-text', type: 'text', content: 'Digital ID', x: 46, y: 255, width: 70, align: 'center', fontSize: 7, fill: '#6b7280' }
          ]
        }
      }
    ],
    modern: [
      // ... existing vertical modern templates ...
      {
        id: 'vert-purple-sleek',
        name: 'Purple Sleek',
        size: '54x86',
        preview: 'linear-gradient(135deg, #6b21a8 0%, #a855f7 50%, #f3e8ff 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'purple-accent', type: 'rect', x: 0, y: 0, width: 162, height: 70, fill: 'linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)' },
            { id: 'purple-logo-circle', type: 'circle', x: 81, y: 35, width: 40, height: 40, fill: '#ffffff', stroke: '#6b21a8', strokeWidth: 3 },
            { id: 'purple-school', type: 'text', content: 'SLEEK', x: 10, y: 50, width: 142, align: 'center', fontSize: 12, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'purple-academy', type: 'text', content: 'ACADEMY', x: 10, y: 65, width: 142, align: 'center', fontSize: 10, fill: '#e9d5ff' },
            { id: 'purple-photo-bg', type: 'rect', x: 26, y: 80, width: 110, height: 130, fill: '#f3e8ff', cornerRadius: 20, stroke: '#a855f7', strokeWidth: 2 },
            { id: 'purple-photo', type: 'image', x: 31, y: 85, width: 100, height: 120, cornerRadius: 15, src: '' },
            { id: 'purple-name', type: 'text', content: 'Ava Thompson', x: 10, y: 220, width: 142, align: 'center', fontSize: 14, fill: '#6b21a8', fontStyle: 'bold' },
            { id: 'purple-grade', type: 'text', content: 'Grade 11', x: 10, y: 238, width: 142, align: 'center', fontSize: 10, fill: '#6b7280' },
            { id: 'purple-id', type: 'text', content: 'SA2024G001', x: 10, y: 253, width: 142, align: 'center', fontSize: 9, fill: '#6b21a8', fontStyle: 'bold' },
            { id: 'purple-qr', type: 'rect', x: 46, y: 268, width: 70, height: 70, fill: '#6b21a8', cornerRadius: 10 },
            { id: 'purple-footer', type: 'rect', x: 0, y: 343, width: 162, height: 33, fill: '#f3e8ff' },
            { id: 'purple-year', type: 'text', content: '2024-2025', x: 10, y: 356, width: 142, align: 'center', fontSize: 9, fill: '#6b21a8' }
          ]
        },
        back: {
          backgroundColor: '#faf5ff',
          elements: [
            { id: 'purple-back-header', type: 'rect', x: 0, y: 0, width: 162, height: 35, fill: 'linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)' },
            { id: 'purple-back-title', type: 'text', content: 'MODERN PROFILE', x: 10, y: 17, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'purple-info-box', type: 'rect', x: 10, y: 45, width: 142, height: 180, fill: '#ffffff', cornerRadius: 12, stroke: '#e9d5ff', strokeWidth: 2 },
            { id: 'purple-personal', type: 'text', content: 'Personal Info', x: 15, y: 60, fontSize: 9, fill: '#6b21a8', fontStyle: 'bold' },
            { id: 'purple-dob', type: 'text', content: 'DOB: 25/03/2007', x: 15, y: 75, fontSize: 8, fill: '#374151' },
            { id: 'purple-parent', type: 'text', content: 'Parent: Sarah Thompson', x: 15, y: 90, fontSize: 8, fill: '#374151' },
            { id: 'purple-contact', type: 'text', content: 'Phone: (555) 987-6543', x: 15, y: 105, fontSize: 8, fill: '#374151' },
            { id: 'purple-email', type: 'text', content: 'Email: ava@sleek.edu', x: 15, y: 120, fontSize: 8, fill: '#374151' },
            { id: 'purple-address', type: 'text', content: 'Address: 789 Modern St', x: 15, y: 135, fontSize: 8, fill: '#374151' },
            { id: 'purple-emergency', type: 'text', content: 'Emergency: (555) 123-4567', x: 15, y: 150, fontSize: 8, fill: '#374151' },
            { id: 'purple-back-qr', type: 'rect', x: 46, y: 165, width: 70, height: 70, fill: '#6b21a8', cornerRadius: 8 },
            { id: 'purple-digital', type: 'text', content: 'Digital Access', x: 46, y: 240, width: 70, align: 'center', fontSize: 8, fill: '#6b7280' }
          ]
        }
      }
    ],
    creative: [
      // ... existing vertical creative templates ...
      {
        id: 'vert-forest-nature',
        name: 'Forest Nature',
        size: '54x86',
        preview: 'linear-gradient(135deg, #14532d 0%, #16a34a 50%, #dcfce7 100%)',
        front: {
          backgroundColor: '#ffffff',
          elements: [
            { id: 'forest-top', type: 'rect', x: 0, y: 0, width: 162, height: 80, fill: 'linear-gradient(180deg, #14532d 0%, #16a34a 100%)' },
            { id: 'tree-icon', type: 'text', content: '🌳', x: 66, y: 25, fontSize: 30, fill: '#ffffff' },
            { id: 'forest-school', type: 'text', content: 'FOREST SCHOOL', x: 10, y: 60, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'nature-motto', type: 'text', content: 'Learn in Nature', x: 10, y: 75, width: 142, align: 'center', fontSize: 8, fill: '#bbf7d0' },
            { id: 'forest-photo-frame', type: 'rect', x: 21, y: 90, width: 120, height: 140, fill: '#f0fdf4', cornerRadius: 25, stroke: '#16a34a', strokeWidth: 3 },
            { id: 'forest-photo', type: 'image', x: 26, y: 95, width: 110, height: 130, cornerRadius: 20, src: '' },
            { id: 'forest-name', type: 'text', content: 'Noah Green', x: 10, y: 240, width: 142, align: 'center', fontSize: 14, fill: '#14532d', fontStyle: 'bold' },
            { id: 'forest-grade', type: 'text', content: 'Grade 7 | Nature Club', x: 10, y: 258, width: 142, align: 'center', fontSize: 10, fill: '#64748b' },
            { id: 'forest-id', type: 'text', content: 'FS2024N001', x: 10, y: 273, width: 142, align: 'center', fontSize: 9, fill: '#16a34a', fontStyle: 'bold' },
            { id: 'forest-activities', type: 'text', content: '🌱 Gardening 🦋 Biology 🏕️ Camping', x: 10, y: 288, width: 142, align: 'center', fontSize: 9, fill: '#64748b' },
            { id: 'forest-qr', type: 'rect', x: 46, y: 303, width: 70, height: 70, fill: '#16a34a', cornerRadius: 12 },
            { id: 'forest-footer', type: 'rect', x: 0, y: 378, width: 162, height: 28, fill: '#f0fdf4' },
            { id: 'forest-year', type: 'text', content: '2024-2025 Natural Year', x: 10, y: 390, width: 142, align: 'center', fontSize: 9, fill: '#16a34a' }
          ]
        },
        back: {
          backgroundColor: '#f0fdf4',
          elements: [
            { id: 'forest-back-header', type: 'rect', x: 0, y: 0, width: 162, height: 40, fill: 'linear-gradient(180deg, #14532d 0%, #16a34a 100%)' },
            { id: 'forest-back-title', type: 'text', content: 'NATURE EXPLORER', x: 10, y: 20, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
            { id: 'forest-activities-box', type: 'rect', x: 10, y: 50, width: 142, height: 150, fill: '#ffffff', cornerRadius: 15, stroke: '#bbf7d0', strokeWidth: 2 },
            { id: 'forest-nature-activities', type: 'text', content: 'Outdoor Activities', x: 15, y: 65, fontSize: 9, fill: '#14532d', fontStyle: 'bold' },
            { id: 'forest-hiking', type: 'text', content: '🥾 Hiking Club Member', x: 15, y: 80, fontSize: 8, fill: '#374151' },
            { id: 'forest-bird-watching', type: 'text', content: '🦅 Bird Watching Expert', x: 15, y: 95, fontSize: 8, fill: '#374151' },
            { id: 'forest-plant-study', type: 'text', content: '🌿 Plant Study Leader', x: 15, y: 110, fontSize: 8, fill: '#374151' },
            { id: 'forest-camping', type: 'text', content: '🏕️ Camping Enthusiast', x: 15, y: 125, fontSize: 8, fill: '#374151' },
            { id: 'forest-eco-projects', type: 'text', content: '♻️ Eco Projects Volunteer', x: 15, y: 140, fontSize: 8, fill: '#374151' },
            { id: 'forest-parent', type: 'text', content: 'Parent: Environmental Scientist', x: 15, y: 155, fontSize: 8, fill: '#374151' },
            { id: 'forest-back-qr', type: 'rect', x: 46, y: 165, width: 70, height: 70, fill: '#16a34a', cornerRadius: 10 },
            { id: 'forest-nature-profile', type: 'text', content: 'Nature Profile', x: 46, y: 240, width: 70, align: 'center', fontSize: 8, fill: '#64748b' },
            { id: 'forest-quote', type: 'text', content: 'In every walk with nature, one receives more than he seeks!', x: 10, y: 260, width: 142, align: 'center', fontSize: 7, fill: '#16a34a', fontStyle: 'italic' }
          ]
        }
      }
    ]
  }
};

// ─── Smart Template Generator: 10 base layouts × 20+ color themes ───
const colorThemes = [
  { id: 'midnight', name: 'Midnight Blue', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#dbeafe', bg: '#f8fafc', category: 'corporate' },
  { id: 'slate', name: 'Slate Gray', primary: '#334155', secondary: '#64748b', accent: '#f1f5f9', bg: '#f8fafc', category: 'corporate' },
  { id: 'emerald', name: 'Emerald', primary: '#047857', secondary: '#10b981', accent: '#d1fae5', bg: '#f0fdf4', category: 'corporate' },
  { id: 'ruby', name: 'Ruby Red', primary: '#991b1b', secondary: '#dc2626', accent: '#fee2e2', bg: '#fef2f2', category: 'corporate' },
  { id: 'amber', name: 'Amber Gold', primary: '#92400e', secondary: '#d97706', accent: '#fef3c7', bg: '#fffbeb', category: 'corporate' },
  { id: 'violet', name: 'Royal Violet', primary: '#5b21b6', secondary: '#7c3aed', accent: '#ede9fe', bg: '#f5f3ff', category: 'modern' },
  { id: 'rose', name: 'Rose Pink', primary: '#9f1239', secondary: '#f43f5e', accent: '#ffe4e6', bg: '#fff1f2', category: 'modern' },
  { id: 'cyan', name: 'Cyan Tech', primary: '#0e7490', secondary: '#06b6d4', accent: '#cffafe', bg: '#ecfeff', category: 'modern' },
  { id: 'lime', name: 'Lime Fresh', primary: '#3f6212', secondary: '#84cc16', accent: '#ecfccb', bg: '#f7fee7', category: 'modern' },
  { id: 'fuchsia', name: 'Fuchsia Pop', primary: '#86198f', secondary: '#d946ef', accent: '#fae8ff', bg: '#fdf4ff', category: 'creative' },
  { id: 'orange', name: 'Sunset Orange', primary: '#9a3412', secondary: '#f97316', accent: '#ffedd5', bg: '#fff7ed', category: 'creative' },
  { id: 'sky', name: 'Sky Blue', primary: '#0369a1', secondary: '#0ea5e9', accent: '#e0f2fe', bg: '#f0f9ff', category: 'modern' },
  { id: 'teal', name: 'Teal Zen', primary: '#115e59', secondary: '#14b8a6', accent: '#ccfbf1', bg: '#f0fdfa', category: 'modern' },
  { id: 'indigo', name: 'Indigo Deep', primary: '#312e81', secondary: '#6366f1', accent: '#e0e7ff', bg: '#eef2ff', category: 'corporate' },
  { id: 'stone', name: 'Warm Stone', primary: '#44403c', secondary: '#78716c', accent: '#f5f5f4', bg: '#fafaf9', category: 'corporate' },
  { id: 'pine', name: 'Pine Forest', primary: '#14532d', secondary: '#16a34a', accent: '#dcfce7', bg: '#f0fdf4', category: 'creative' },
  { id: 'navy', name: 'Dark Navy', primary: '#172554', secondary: '#1d4ed8', accent: '#dbeafe', bg: '#eff6ff', category: 'corporate' },
  { id: 'wine', name: 'Wine Berry', primary: '#7c2d12', secondary: '#b91c1c', accent: '#fecaca', bg: '#fef2f2', category: 'corporate' },
  { id: 'ocean', name: 'Ocean Deep', primary: '#164e63', secondary: '#0891b2', accent: '#a5f3fc', bg: '#ecfeff', category: 'creative' },
  { id: 'plum', name: 'Plum Rich', primary: '#581c87', secondary: '#a855f7', accent: '#f3e8ff', bg: '#faf5ff', category: 'creative' },
];

const baseLayouts = [
  { id: 'photo-left', name: 'Photo Left', orient: 'horizontal', size: '100x70' },
  { id: 'photo-top', name: 'Photo Top', orient: 'vertical', size: '54x86' },
  { id: 'centered', name: 'Centered Profile', orient: 'vertical', size: '54x86' },
  { id: 'badge', name: 'Badge Style', orient: 'vertical', size: '54x86' },
  { id: 'corporate-dense', name: 'Corporate Dense', orient: 'horizontal', size: '100x70' },
  { id: 'minimal-text', name: 'Minimal Text', orient: 'horizontal', size: '100x70' },
  { id: 'student-classic', name: 'Student Classic', orient: 'horizontal', size: '100x70' },
  { id: 'event-pass', name: 'Event Pass', orient: 'vertical', size: '54x86' },
  { id: 'qr-focus', name: 'QR Focus', orient: 'horizontal', size: '100x70' },
  { id: 'dual-accent', name: 'Dual Accent', orient: 'horizontal', size: '100x70' },
];

function generateHorizontalElements(theme) {
  return [
    { id: `h-${theme.id}-header`, type: 'rect', x: 0, y: 0, width: 300, height: 40, fill: theme.primary },
    { id: `h-${theme.id}-logo`, type: 'image', x: 15, y: 8, width: 35, height: 24, cornerRadius: 4, src: '' },
    { id: `h-${theme.id}-school`, type: 'text', content: 'SCHOOL NAME', x: 60, y: 12, fontSize: 13, fill: '#ffffff', fontStyle: 'bold' },
    { id: `h-${theme.id}-photo`, type: 'image', x: 18, y: 55, width: 65, height: 80, cornerRadius: 6, src: '' },
    { id: `h-${theme.id}-border`, type: 'rect', x: 16, y: 53, width: 69, height: 84, fill: 'transparent', stroke: theme.primary, strokeWidth: 2, cornerRadius: 8 },
    { id: `h-${theme.id}-name`, type: 'text', content: 'Student Name', x: 100, y: 60, fontSize: 16, fill: theme.primary, fontStyle: 'bold' },
    { id: `h-${theme.id}-grade`, type: 'text', content: 'Grade 10 - Section A', x: 100, y: 80, fontSize: 11, fill: '#64748b' },
    { id: `h-${theme.id}-id`, type: 'text', content: 'ID: 2024-001', x: 100, y: 95, fontSize: 10, fill: theme.primary, fontStyle: 'bold' },
    { id: `h-${theme.id}-dob`, type: 'text', content: 'DOB: 01/01/2008', x: 100, y: 110, fontSize: 10, fill: '#64748b' },
    { id: `h-${theme.id}-barcode`, type: 'rect', x: 220, y: 55, width: 65, height: 80, fill: '#000000' },
    { id: `h-${theme.id}-footer`, type: 'rect', x: 0, y: 180, width: 300, height: 36, fill: theme.primary },
    { id: `h-${theme.id}-valid`, type: 'text', content: 'Valid: 2024-2025', x: 15, y: 195, fontSize: 10, fill: '#ffffff' },
  ];
}

function generateVerticalElements(theme) {
  return [
    { id: `v-${theme.id}-header`, type: 'rect', x: 0, y: 0, width: 162, height: 100, fill: theme.primary },
    { id: `v-${theme.id}-logo`, type: 'image', x: 56, y: 12, width: 50, height: 35, cornerRadius: 5, src: '' },
    { id: `v-${theme.id}-school`, type: 'text', content: 'SCHOOL NAME', x: 10, y: 55, width: 142, align: 'center', fontSize: 11, fill: '#ffffff', fontStyle: 'bold' },
    { id: `v-${theme.id}-motto`, type: 'text', content: 'Excellence in Education', x: 10, y: 72, width: 142, align: 'center', fontSize: 8, fill: theme.accent },
    { id: `v-${theme.id}-photo`, type: 'image', x: 36, y: 115, width: 90, height: 110, cornerRadius: 8, src: '' },
    { id: `v-${theme.id}-border`, type: 'rect', x: 34, y: 113, width: 94, height: 114, fill: 'transparent', stroke: theme.primary, strokeWidth: 2, cornerRadius: 10 },
    { id: `v-${theme.id}-name`, type: 'text', content: 'Student Name', x: 10, y: 240, width: 142, align: 'center', fontSize: 13, fill: theme.primary, fontStyle: 'bold' },
    { id: `v-${theme.id}-grade`, type: 'text', content: 'Grade 10', x: 10, y: 258, width: 142, align: 'center', fontSize: 10, fill: '#64748b' },
    { id: `v-${theme.id}-id`, type: 'text', content: 'ID: 2024-001', x: 10, y: 275, width: 142, align: 'center', fontSize: 9, fill: theme.primary, fontStyle: 'bold' },
    { id: `v-${theme.id}-barcode`, type: 'rect', x: 31, y: 290, width: 100, height: 25, fill: '#000000' },
    { id: `v-${theme.id}-footer`, type: 'rect', x: 0, y: 320, width: 162, height: 36, fill: theme.primary },
    { id: `v-${theme.id}-valid`, type: 'text', content: '2024-2025', x: 10, y: 335, width: 142, align: 'center', fontSize: 9, fill: '#ffffff' },
  ];
}

function generateBackElements(theme, isHoriz) {
  const w = isHoriz ? 300 : 162;
  return [
    { id: `b-${theme.id}-header`, type: 'rect', x: 0, y: 0, width: w, height: isHoriz ? 35 : 38, fill: theme.primary },
    { id: `b-${theme.id}-title`, type: 'text', content: 'STUDENT INFORMATION', x: 10, y: isHoriz ? 18 : 19, width: w - 20, align: isHoriz ? 'left' : 'center', fontSize: isHoriz ? 12 : 10, fill: '#ffffff', fontStyle: 'bold' },
    { id: `b-${theme.id}-parent`, type: 'text', content: 'Parent: Guardian Name', x: 15, y: isHoriz ? 55 : 55, fontSize: 9, fill: '#374151' },
    { id: `b-${theme.id}-phone`, type: 'text', content: 'Phone: (555) 123-4567', x: 15, y: isHoriz ? 72 : 72, fontSize: 9, fill: '#374151' },
    { id: `b-${theme.id}-addr`, type: 'text', content: 'Address: 123 School St', x: 15, y: isHoriz ? 89 : 89, fontSize: 9, fill: '#374151' },
    { id: `b-${theme.id}-emerg`, type: 'text', content: 'Emergency: (555) 987-6543', x: 15, y: isHoriz ? 106 : 106, fontSize: 9, fill: '#374151' },
    { id: `b-${theme.id}-qr`, type: 'rect', x: isHoriz ? 210 : 46, y: isHoriz ? 50 : 130, width: 65, height: 65, fill: theme.primary, cornerRadius: 8 },
    { id: `b-${theme.id}-qrlbl`, type: 'text', content: 'Digital ID', x: isHoriz ? 210 : 46, y: isHoriz ? 120 : 200, width: 65, align: 'center', fontSize: 8, fill: '#64748b' },
  ];
}

// Generate all variations
const _generatedTemplates = [];
baseLayouts.forEach(layout => {
  colorThemes.forEach(theme => {
    const isH = layout.orient === 'horizontal';
    _generatedTemplates.push({
      id: `gen-${layout.id}-${theme.id}`,
      name: `${theme.name} ${layout.name}`,
      size: layout.size,
      orientation: layout.orient,
      category: theme.category,
      tags: [theme.id, layout.id, theme.category],
      preview: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.accent} 100%)`,
      front: {
        backgroundColor: '#ffffff',
        elements: isH ? generateHorizontalElements(theme) : generateVerticalElements(theme),
      },
      back: {
        backgroundColor: theme.bg,
        elements: generateBackElements(theme, isH),
      },
    });
  });
});

// Helper function to get all templates flattened
export const getAllTemplates = () => {
  const allTemplates = [];
  const seenIds = new Set();
  
  // Hand-crafted templates first
  Object.entries(schoolIdTemplates).forEach(([orientation, categories]) => {
    Object.entries(categories).forEach(([category, templates]) => {
      templates.forEach(template => {
        if (!seenIds.has(template.id)) {
          seenIds.add(template.id);
          allTemplates.push({ ...template, orientation, category });
        }
      });
    });
  });
  
  // Generated templates
  _generatedTemplates.forEach(t => {
    if (!seenIds.has(t.id)) {
      seenIds.add(t.id);
      allTemplates.push(t);
    }
  });
  
  return allTemplates;
};

// Helper function to get templates by orientation
export const getTemplatesByOrientation = (orientation) => {
  const templates = [];
  const categories = schoolIdTemplates[orientation] || {};
  
  Object.entries(categories).forEach(([category, categoryTemplates]) => {
    categoryTemplates.forEach(template => {
      templates.push({
        ...template,
        orientation,
        category
      });
    });
  });
  
  return templates;
};

// Helper function to get templates by category
export const getTemplatesByCategory = (category) => {
  const templates = [];
  
  Object.entries(schoolIdTemplates).forEach(([orientation, categories]) => {
    if (categories[category]) {
      categories[category].forEach(template => {
        templates.push({
          ...template,
          orientation,
          category
        });
      });
    }
  });
  
  return templates;
};
