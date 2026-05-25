export type FaqItem = {
  question: string;
  answer: string;
};

function cleanMarkdown(text: string) {
  return text
    .replace(/\*\*/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFaqItemsFromMarkdown(markdown: string): FaqItem[] {
  const faqStart = markdown.search(/^##+\s+FAQ\s*$/im);
  if (faqStart < 0) return [];

  const faqBlock = markdown.slice(faqStart);
  const nextSectionAfterFaqHeading = faqBlock.slice(1).search(/^##\s+/im);
  const content =
    nextSectionAfterFaqHeading >= 0
      ? faqBlock.slice(0, nextSectionAfterFaqHeading + 1)
      : faqBlock;
  const lines = content.split(/\r?\n/);
  const items: FaqItem[] = [];
  let currentQuestion = '';
  let answerLines: string[] = [];

  for (const line of lines) {
    const questionMatch = line.match(/^###\s+(.+?)\s*$/);
    if (questionMatch) {
      if (currentQuestion && answerLines.length > 0) {
        items.push({
          question: cleanMarkdown(currentQuestion),
          answer: cleanMarkdown(answerLines.join(' ')),
        });
      }
      currentQuestion = questionMatch[1];
      answerLines = [];
      continue;
    }

    if (currentQuestion && !line.match(/^##+\s+/)) {
      answerLines.push(line);
    }
  }

  if (currentQuestion && answerLines.length > 0) {
    items.push({
      question: cleanMarkdown(currentQuestion),
      answer: cleanMarkdown(answerLines.join(' ')),
    });
  }

  return items.filter((item) => item.question && item.answer);
}
