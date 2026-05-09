const gridColor = 'rgba(255, 255, 255, 0.04)';
const tickColor = '#5a6a7a';
const fontFamily = "'JetBrains Mono', 'SF Mono', monospace";
const bodyFont = "'Outfit', sans-serif";
const accentCyan = '#00f0ff';
const accentCyanDim = 'rgba(0, 240, 255, 0.15)';
const warm = '#f59e0b';

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1200,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0d1117',
      borderColor: '#1e2a35',
      borderWidth: 1,
      titleFont: { family: fontFamily, size: 11 },
      bodyFont: { family: bodyFont, size: 13 },
      padding: 12,
      cornerRadius: 3,
      titleColor: '#5a6a7a',
      bodyColor: '#d4dee8',
    },
  },
  scales: {
    x: {
      ticks: { color: tickColor, font: { family: fontFamily, size: 10 } },
      grid: { color: gridColor, lineWidth: 1 },
      border: { color: 'transparent' },
    },
    y: {
      ticks: { color: tickColor, font: { family: fontFamily, size: 10 } },
      grid: { color: gridColor, lineWidth: 1 },
      border: { color: 'transparent' },
    },
  },
};

// ── ChatGPT Growth ──
new Chart(document.getElementById('growthChart'), {
  type: 'line',
  data: {
    labels: ['Nov 2022', 'Jan 2023', 'Aug 2023', 'Oct 2024', 'Dec 2024', 'Feb 2025', 'Apr 2025', 'Feb 2026'],
    datasets: [{
      label: 'Weekly Active Users (millions)',
      data: [0.15, 15, 100, 250, 300, 400, 800, 910],
      borderColor: accentCyan,
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        gradient.addColorStop(0, 'rgba(0, 240, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: '#080b0e',
      pointBorderColor: accentCyan,
      pointBorderWidth: 2,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: accentCyan,
      borderWidth: 2.5,
    }],
  },
  options: {
    ...defaultOptions,
    scales: {
      ...defaultOptions.scales,
      y: {
        ...defaultOptions.scales.y,
        ticks: {
          ...defaultOptions.scales.y.ticks,
          callback: v => v + 'M',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: ctx => ctx.parsed.y + ' million weekly active users',
        },
      },
    },
  },
});

// ── Time to 100M Users ──
new Chart(document.getElementById('raceChart'), {
  type: 'bar',
  data: {
    labels: ['ChatGPT', 'TikTok', 'Instagram', 'Pinterest', 'Spotify', 'Facebook'],
    datasets: [{
      label: 'Months to 100M users',
      data: [2, 9, 30, 41, 55, 54],
      backgroundColor: (ctx) => {
        return ctx.dataIndex === 0 ? accentCyan : '#1e2a35';
      },
      hoverBackgroundColor: (ctx) => {
        return ctx.dataIndex === 0 ? accentCyan : '#2a3a4a';
      },
      borderRadius: 2,
      barThickness: 36,
    }],
  },
  options: {
    ...defaultOptions,
    indexAxis: 'y',
    scales: {
      x: {
        ...defaultOptions.scales.x,
        ticks: {
          ...defaultOptions.scales.x.ticks,
          callback: v => v + ' mo',
        },
        beginAtZero: true,
      },
      y: {
        ...defaultOptions.scales.y,
        ticks: {
          color: (ctx) => ctx.index === 0 ? accentCyan : tickColor,
          font: { family: fontFamily, size: 11, weight: 'bold' },
        },
        grid: { display: false },
      },
    },
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: ctx => ctx.parsed.x + ' months to 100M users',
        },
      },
    },
  },
});

// ── Revenue ──
new Chart(document.getElementById('revenueChart'), {
  type: 'bar',
  data: {
    labels: ['OpenAI 2024', 'OpenAI 2026', 'Anthropic 2026', 'Cursor 2026', 'Microsoft AI 2024'],
    datasets: [{
      label: 'Revenue (Billions USD)',
      data: [2.7, 25, 30, 2, 13],
      backgroundColor: [accentCyan + '40', accentCyan, warm, '#34d399', '#6366f1'],
      hoverBackgroundColor: [accentCyan, accentCyan, warm, '#34d399', '#818cf8'],
      borderRadius: 2,
      barThickness: 48,
    }],
  },
  options: {
    ...defaultOptions,
    scales: {
      ...defaultOptions.scales,
      y: {
        ...defaultOptions.scales.y,
        ticks: {
          ...defaultOptions.scales.y.ticks,
          callback: v => '$' + v + 'B',
        },
        beginAtZero: true,
      },
      x: {
        ...defaultOptions.scales.x,
        ticks: {
          ...defaultOptions.scales.x.ticks,
          font: { family: fontFamily, size: 9 },
        },
      },
    },
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: ctx => '$' + ctx.parsed.y + ' billion',
        },
      },
    },
  },
});

// ── Developer Tools ──
new Chart(document.getElementById('devToolsChart'), {
  type: 'bar',
  data: {
    labels: ['ChatGPT', 'GitHub Copilot', 'Google Gemini', 'Claude'],
    datasets: [{
      label: 'Developer Usage %',
      data: [82.1, 41.2, 23.9, 8.1],
      backgroundColor: [accentCyan, accentCyan + 'aa', accentCyan + '66', accentCyan + '33'],
      hoverBackgroundColor: accentCyan,
      borderRadius: 2,
      barThickness: 48,
    }],
  },
  options: {
    ...defaultOptions,
    scales: {
      ...defaultOptions.scales,
      y: {
        ...defaultOptions.scales.y,
        ticks: {
          ...defaultOptions.scales.y.ticks,
          callback: v => v + '%',
        },
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: ctx => ctx.parsed.y + '% of developers',
        },
      },
    },
  },
});
