import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

// Load seed data using ES module import
import { INITIAL_CHAPTERS, INITIAL_TOPICS, INITIAL_FLASHCARDS, INITIAL_WORKED_ANSWERS } from '../src/data/seedData.js';

function buildStudyGuidePdf() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = margin;

  // Color Palette
  const slate900 = [15, 23, 42];
  const amber600 = [217, 119, 6];
  const emerald600 = [5, 150, 105];
  const indigo600 = [79, 70, 229];
  const textDark = [30, 41, 59];
  const textMuted = [100, 116, 139];

  const checkPageBreak = (needed = 16) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
      renderHeader();
    }
  };

  const renderHeader = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...textMuted);
    doc.text("CA LAW LEARN — FULL SYLLABUS COMPREHENSIVE STUDY GUIDE", margin, y);
    doc.text("ICAI EXAM 2026 REVISION EDITION", pageWidth - margin, y, { align: "right" });
    y += 3;
    doc.setLineWidth(0.4);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 7;
  };

  // COVER PAGE / COVER HEADER
  renderHeader();

  doc.setFillColor(...slate900);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 26, 3, 3, 'F');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("CA FOUNDATION — BUSINESS LAWS", margin + 6, y + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(251, 191, 36); // Amber 400
  doc.text("Complete 7-Chapter Offline Master Study Guide & Examiner Keyword Blueprint", margin + 6, y + 18);

  y += 32;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  const introText = "This master study guide covers all 7 syllabus chapters, 21 topics, legal definitions, statutory definition breakdowns, examiner keywords, landmark case laws, and practical examples in simple language for rapid revision.";
  const splitIntro = doc.splitTextToSize(introText, pageWidth - (margin * 2));
  doc.text(splitIntro, margin, y);
  y += (splitIntro.length * 4.5) + 6;

  // CHAPTER LOOP
  INITIAL_CHAPTERS.forEach((chap, cIdx) => {
    checkPageBreak(30);

    // Chapter Header Banner
    doc.setFillColor(...slate900);
    doc.roundedRect(margin, y, pageWidth - (margin * 2), 11, 2, 2, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(251, 191, 36);
    doc.text(`${chap.unitNumber}: ${chap.title.toUpperCase()}`, margin + 4, y + 7);
    y += 15;

    // Chapter description
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(...textMuted);
    const splitDesc = doc.splitTextToSize(chap.description, pageWidth - (margin * 2));
    doc.text(splitDesc, margin, y);
    y += (splitDesc.length * 4) + 4;

    // Chapter Topics
    const chapTopics = INITIAL_TOPICS.filter(t => t.chapterId === chap.id);

    chapTopics.forEach((topic, tIdx) => {
      checkPageBreak(25);

      // Topic Title Pill
      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin, y, pageWidth - (margin * 2), 8, 1.5, 1.5, 'FD');

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(...indigo600);
      doc.text(`Topic ${cIdx + 1}.${tIdx + 1}: ${topic.title}`, margin + 3, y + 5.5);
      y += 12;

      // Deep Explanation
      if (topic.content?.fullExplanation) {
        checkPageBreak(15);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(...slate900);
        doc.text("Deep Learning Overview:", margin + 2, y);
        y += 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...textDark);
        const splitExp = doc.splitTextToSize(topic.content.fullExplanation, pageWidth - (margin * 2) - 4);
        doc.text(splitExp, margin + 4, y);
        y += (splitExp.length * 3.8) + 3;
      }

      // Definition Breakdown Widget
      if (topic.definitionBreakdown) {
        checkPageBreak(20);
        const bd = topic.definitionBreakdown;

        doc.setFillColor(254, 243, 199); // Amber 100
        doc.setDrawColor(245, 158, 11);
        doc.roundedRect(margin + 2, y, pageWidth - (margin * 2) - 4, 7 + (bd.parts.length * 5), 1, 1, 'FD');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...amber600);
        doc.text("🧩 Statutory Definition Breakdown:", margin + 4, y + 4.5);
        let bdy = y + 8;

        bd.parts.forEach(p => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(...slate900);
          doc.text(`• "${p.phrase}" → `, margin + 6, bdy);
          const pWidth = doc.getTextWidth(`• "${p.phrase}" → `);
          
          doc.setFont("helvetica", "normal");
          doc.setTextColor(...textDark);
          const splitP = doc.splitTextToSize(p.explanation, pageWidth - (margin * 2) - 12 - pWidth);
          doc.text(splitP, margin + 6 + pWidth, bdy);
          bdy += (splitP.length * 3.5) + 1;
        });

        y = bdy + 3;
      }

      // Statutory Exceptions
      if (topic.content?.exceptions && topic.content.exceptions.length > 0) {
        checkPageBreak(12);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(220, 38, 38); // Red 600
        doc.text("⚠️ Statutory Exceptions & Caveats:", margin + 2, y);
        y += 4;

        topic.content.exceptions.forEach(ex => {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);
          doc.setTextColor(...textDark);
          const splitEx = doc.splitTextToSize(`• ${ex}`, pageWidth - (margin * 2) - 6);
          doc.text(splitEx, margin + 4, y);
          y += (splitEx.length * 3.5) + 1;
        });
        y += 2;
      }

      // Topic Flashcards (Questions, Answers, Keywords, Case Law)
      const topicCards = INITIAL_FLASHCARDS.filter(f => f.topicId === topic.id);

      topicCards.forEach(card => {
        checkPageBreak(18);

        // Q & A Box
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(...slate900);
        const splitQ = doc.splitTextToSize(`Q: ${card.front}`, pageWidth - (margin * 2) - 4);
        doc.text(splitQ, margin + 2, y);
        y += (splitQ.length * 4) + 1;

        if (card.back?.sectionRef) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(...amber600);
          doc.text(`[ Ref: ${card.back.sectionRef} ]`, margin + 4, y);
          y += 4;
        }

        if (card.back?.definition) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(...textDark);
          const splitAns = doc.splitTextToSize(`Ans: ${card.back.definition}`, pageWidth - (margin * 2) - 6);
          doc.text(splitAns, margin + 4, y);
          y += (splitAns.length * 3.8) + 2;
        }

        if (card.back?.keywords && card.back.keywords.length > 0) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(...emerald600);
          const kwText = `Examiner Keywords: ${card.back.keywords.map(k => `[ ${k} ]`).join(' ')}`;
          const splitKw = doc.splitTextToSize(kwText, pageWidth - (margin * 2) - 6);
          doc.text(splitKw, margin + 4, y);
          y += (splitKw.length * 3.5) + 2;
        }

        if (card.back?.caseLaw) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(...amber600);
          doc.text(`Landmark Case: ${card.back.caseLaw} — "${card.back.caseSummary || ''}"`, margin + 4, y);
          y += 4.5;
        }

        y += 2;
      });

      y += 4;
    });

    y += 6;
  });

  // WORKED ICAI ANSWERS SECTION
  checkPageBreak(35);
  doc.setFillColor(...slate900);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 10, 2, 2, 'F');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(251, 191, 36);
  doc.text("WORKED ICAI EXAM QUESTION BLUEPRINTS (4-STEP METHOD)", margin + 4, y + 6.5);
  y += 14;

  INITIAL_WORKED_ANSWERS.forEach(wa => {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...indigo600);
    doc.text(`• ${wa.title}`, margin + 2, y);
    y += 4.5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...textDark);
    const splitQ = doc.splitTextToSize(`Question: "${wa.question}"`, pageWidth - (margin * 2) - 4);
    doc.text(splitQ, margin + 4, y);
    y += (splitQ.length * 3.8) + 3;

    Object.values(wa.answerStructure).forEach(step => {
      checkPageBreak(10);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...textDark);
      const splitS = doc.splitTextToSize(step, pageWidth - (margin * 2) - 6);
      doc.text(splitS, margin + 6, y);
      y += (splitS.length * 3.5) + 1;
    });

    y += 5;
  });

  // Page Numbers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...textMuted);
    doc.text(`Page ${i} of ${totalPages} — CA Law Learn Offline Master Study Guide`, pageWidth / 2, pageHeight - 7, { align: 'center' });
  }

  // Ensure public/assets directory exists
  const publicAssetsDir = path.resolve('public/assets');
  if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
  }

  const outputPath = path.join(publicAssetsDir, 'CA-Law-Learn-Study-Guide.pdf');
  const pdfBuffer = doc.output('arraybuffer');
  fs.writeFileSync(outputPath, Buffer.from(pdfBuffer));

  // Also write to public/ for root fallback
  const rootPublicPath = path.resolve('public/CA-Law-Learn-Study-Guide.pdf');
  fs.writeFileSync(rootPublicPath, Buffer.from(pdfBuffer));

  console.log(`✅ Successfully generated Study Guide PDF at: ${outputPath}`);
  console.log(`✅ Also copied to: ${rootPublicPath}`);
}

buildStudyGuidePdf();
