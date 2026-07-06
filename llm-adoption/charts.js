const gridColor = 'rgba(255, 255, 255, 0.04)';
const tickColor = '#5a6a7a';
const fontFamily = "'JetBrains Mono', 'SF Mono', monospace";
const bodyFont = "'Outfit', sans-serif";

const colors = {
  chatgpt:    '#00d4e0',
  gemini:     '#8b5cf6',
  meta:       '#3b82f6',
  copilot:    '#6366f1',
  deepseek:   '#f0a020',
  perplexity: '#34d399',
};

const labels = [
  'Nov 22', 'Jan 23', 'Nov 23', 'Jan 24', 'Feb 24', 'Apr 24',
  'Aug 24', 'Oct 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25',
  'Apr 25', 'May 25', 'Jul 25', 'Aug 25', 'Oct 25', 'Dec 25',
  'Jan 26', 'Feb 26'
];

function lastIndex(data) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i] !== null) return i;
  }
  return -1;
}

function makeLine(label, data, color, opts = {}) {
  const last = lastIndex(data);
  const styles = data.map((v, i) => (i === last && opts.ended) ? 'crossRot' : 'circle');
  const radii = data.map((v, i) => (i === last && opts.ended) ? 7 : 4);

  return {
    label,
    data,
    borderColor: color,
    backgroundColor: opts.fill ? color + '15' : 'transparent',
    fill: !!opts.fill,
    tension: 0.35,
    spanGaps: true,
    pointStyle: styles,
    pointRadius: radii,
    pointBackgroundColor: data.map((v, i) => (i === last && opts.ended) ? 'transparent' : color),
    pointBorderColor: data.map((v, i) => (i === last && opts.ended) ? '#ff4444' : color),
    pointBorderWidth: data.map((v, i) => (i === last && opts.ended) ? 2.5 : 0),
    pointHoverRadius: 7,
    pointHoverBackgroundColor: color,
    borderWidth: opts.thick ? 2.5 : 2,
    borderDash: opts.dashed ? [6, 4] : [],
  };
}

//                              Nov22 Jan23 Nov23 Jan24 Feb24 Apr24 Aug24 Oct24 Dec24 Jan25 Feb25 Mar25 Apr25 May25 Jul25 Aug25 Oct25 Dec25 Jan26 Feb26
new Chart(document.getElementById('adoptionChart'), {
  type: 'line',
  data: {
    labels,
    datasets: [
      makeLine('Meta AI',    [null, null, null, null, null, 0,    null, 500,  600,  700,  null, null, 1000, null, null, null, null, null, null, null], colors.meta,       { thick: true, ended: true }),
      makeLine('ChatGPT',    [0,    15,   100,  null, null, null, 200,  250,  300,  null, 400,  500,  null, null, null, 700,  800,  null, null, 900],  colors.chatgpt,    { fill: true, thick: true }),
      makeLine('Gemini',     [null, null, null, null, 0,    null, null, 90,   null, null, null, 350,  null, 400,  450,  null, 650,  null, null, 750],  colors.gemini,     { thick: true }),
      makeLine('Copilot',    [null, null, 0,    null, null, null, null, null, null, null, null, null, null, null, 100,  null, null, null, 150,  null], colors.copilot,    { dashed: true }),
      makeLine('DeepSeek',   [null, null, null, null, null, null, null, null, 0,    null, 62,   null, null, 125,  null, null, null, 130,  null, null], colors.deepseek,   { dashed: true, ended: true }),
      makeLine('Perplexity', [null, null, null, 0,    null, null, null, null, 15,   null, null, null, null, 30,   null, null, null, null, null, null], colors.perplexity, { dashed: true, ended: true }),
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'start',
        labels: {
          color: '#8a9aaa',
          font: { family: fontFamily, size: 10 },
          boxWidth: 16,
          boxHeight: 2,
          padding: 20,
          usePointStyle: false,
        },
      },
      tooltip: {
        backgroundColor: '#0d1117',
        borderColor: '#1e2a35',
        borderWidth: 1,
        titleFont: { family: fontFamily, size: 11 },
        bodyFont: { family: bodyFont, size: 12 },
        padding: 12,
        cornerRadius: 3,
        titleColor: '#5a6a7a',
        bodyColor: '#d4dee8',
        filter: (item) => item.raw !== null,
        callbacks: {
          label: ctx => {
            const v = ctx.parsed.y;
            const ds = ctx.dataset;
            const isLast = ctx.dataIndex === lastIndex(ds.data);
            if (v === 0) return ' ' + ds.label + ': Launch';
            const suffix = isLast && ds.pointBorderColor[ctx.dataIndex] === '#ff4444'
              ? ' (last reported)' : '';
            return ' ' + ds.label + ': ' + v + 'M' + suffix;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: tickColor,
          font: { family: fontFamily, size: 9 },
          maxRotation: 50,
          minRotation: 30,
        },
        grid: { color: gridColor, lineWidth: 1 },
        border: { color: 'transparent' },
      },
      y: {
        beginAtZero: true,
        max: 1200,
        ticks: {
          color: tickColor,
          font: { family: fontFamily, size: 10 },
          callback: v => v >= 1000 ? (v / 1000) + 'B' : v + 'M',
          stepSize: 200,
        },
        grid: { color: gridColor, lineWidth: 1 },
        border: { color: 'transparent' },
      },
    },
  },
});
