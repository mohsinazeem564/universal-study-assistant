const axios = require('axios');

class DiagramGenerator {
  async generateDiagram(type, data, subject) {
    try {
      switch (type) {
        case 'flowchart':
          return await this.generateFlowchart(data);
        case 'graph':
          return await this.generateGraph(data);
        case 'chart':
          return await this.generateChart(data);
        case 'molecular':
          return await this.generateMolecularStructure(data);
        case 'circuit':
          return await this.generateCircuitDiagram(data);
        case 'anatomical':
          return await this.generateAnatomicalDiagram(data);
        default:
          return await this.generateGenericDiagram(data, subject);
      }
    } catch (error) {
      console.error('Diagram Generation Error:', error);
      throw new Error('Failed to generate diagram');
    }
  }

  async generateFlowchart(data) {
    const mermaidCode = `
graph TD
${data.steps.map((step, i) => `    A${i}[${step}] --> A${i + 1}`).join('\n')}
`;
    
    return await this.renderMermaid(mermaidCode);
  }

  async generateGraph(data) {
    // Using QuickChart API for graphs
    const chartConfig = {
      type: data.chartType || 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.title,
          data: data.values,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: data.title
          }
        }
      }
    };

    const url = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    return { url, type: 'image' };
  }

  async generateChart(data) {
    const chartConfig = {
      type: data.type || 'bar',
      data: {
        labels: data.labels,
        datasets: data.datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: data.title
          }
        }
      }
    };

    const url = `https://quickchart.io/chart?width=800&height=600&c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    return { url, type: 'image' };
  }

  async generateMolecularStructure(data) {
    // For chemistry - molecular structures
    const mermaidCode = `
graph LR
${data.atoms.map((atom, i) => {
  const bonds = data.bonds.filter(b => b.from === i);
  return bonds.map(b => `    ${atom}${i} -->|${b.type}| ${data.atoms[b.to]}${b.to}`).join('\n');
}).join('\n')}
`;
    
    return await this.renderMermaid(mermaidCode);
  }

  async generateCircuitDiagram(data) {
    // For electrical engineering
    const mermaidCode = `
graph LR
    Start((+)) --> ${data.components.map((c, i) => `C${i}[${c}]`).join(' --> ')} --> End((GND))
`;
    
    return await this.renderMermaid(mermaidCode);
  }

  async generateAnatomicalDiagram(data) {
    // For biology/medicine - use text-based representation
    const description = data.parts.map(part => 
      `${part.name}: ${part.description}`
    ).join('\n');
    
    return {
      type: 'text',
      content: description,
      needsImage: true // Flag to generate actual image via AI
    };
  }

  async generateGenericDiagram(data, subject) {
    // Auto-detect best diagram type based on subject
    if (subject.includes('Math') || subject.includes('Physics')) {
      return await this.generateGraph(data);
    } else if (subject.includes('Chemistry')) {
      return await this.generateMolecularStructure(data);
    } else if (subject.includes('Biology')) {
      return await this.generateAnatomicalDiagram(data);
    } else {
      return await this.generateFlowchart(data);
    }
  }

  async renderMermaid(mermaidCode) {
    try {
      // Using Kroki API to render Mermaid diagrams
      const encoded = Buffer.from(mermaidCode).toString('base64');
      const url = `https://kroki.io/mermaid/svg/${encoded}`;
      
      return { url, type: 'svg', code: mermaidCode };
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      return { type: 'code', content: mermaidCode };
    }
  }

  async generateMathVisualization(equation) {
    // LaTeX to image conversion
    const latexUrl = `https://latex.codecogs.com/png.latex?\\dpi{300}\\bg_white ${encodeURIComponent(equation)}`;
    return { url: latexUrl, type: 'image' };
  }

  async generateTimeline(events) {
    const mermaidCode = `
gantt
    title ${events.title || 'Timeline'}
    dateFormat YYYY-MM-DD
    ${events.items.map(item => 
      `section ${item.category}\n    ${item.name} :${item.start}, ${item.duration}`
    ).join('\n    ')}
`;
    
    return await this.renderMermaid(mermaidCode);
  }

  async generateMindMap(data) {
    const mermaidCode = `
mindmap
  root((${data.central}))
${data.branches.map(branch => `    ${branch.name}\n${branch.items.map(item => `      ${item}`).join('\n')}`).join('\n')}
`;
    
    return await this.renderMermaid(mermaidCode);
  }
}

module.exports = new DiagramGenerator();
