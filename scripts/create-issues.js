#!/usr/bin/env node

/**
 * GitHub Issues Creation Script for VoxFoundry
 * 
 * This script creates GitHub issues from the DEVELOPMENT_ISSUES.md file
 * in organized chunks suitable for Copilot agents.
 * 
 * Usage:
 *   node scripts/create-issues.js [--dry-run] [--chunk=N]
 * 
 * Options:
 *   --dry-run     Show what would be created without actually creating
 *   --chunk=N     Create only chunk N (1-4)
 *   --validation  Create only validation issues
 */

const fs = require('fs');
const path = require('path');

// GitHub API configuration (requires GITHUB_TOKEN environment variable)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'TheMrFish3D';
const REPO_NAME = 'VoxFoundry';

// Issue creation configuration
const DRY_RUN = process.argv.includes('--dry-run');
const CHUNK_FILTER = process.argv.find(arg => arg.startsWith('--chunk='))?.split('=')[1];
const VALIDATION_ONLY = process.argv.includes('--validation');

// Define issue chunks for phased development
const ISSUE_CHUNKS = {
  1: {
    name: "Foundation & Infrastructure",
    description: "Critical setup tasks that must be completed before other work can begin",
    issues: [1, 2, 3, 6], // Monorepo, Dev Env, Database, CI/CD
    priority: "Critical",
    dependencies: []
  },
  2: {
    name: "Authentication & Core Services",
    description: "Essential security and API infrastructure",
    issues: [4, 7, 8], // Auth, API Gateway, File Storage
    priority: "High",
    dependencies: [1]
  },
  3: {
    name: "EPUB Processing & AI Integration",
    description: "Core functionality for book processing and AI analysis",
    issues: [5, 9, 10, 11], // EPUB Parser, Character Detection, LLM Client, Acting Notes
    priority: "High",
    dependencies: [1, 2]
  },
  4: {
    name: "Voice Management & Synthesis",
    description: "Voice profile management and audio generation",
    issues: [12, 13, 14, 15, 16, 17], // Voice DB, Analysis, Actor Search, Profile Gen, TTS, Audio Pipeline
    priority: "Medium",
    dependencies: [1, 2, 3]
  },
  5: {
    name: "Frontend Applications",
    description: "User interface development for all applications",
    issues: [18, 19, 20], // Main UI, Voice Library UI, Profile Creator UI
    priority: "Medium",
    dependencies: [1, 2, 3, 4]
  },
  6: {
    name: "Testing & Quality Assurance",
    description: "Comprehensive testing and security validation",
    issues: [21, 22, 23], // Unit Tests, Integration Tests, Security Audit
    priority: "Medium",
    dependencies: [1, 2, 3, 4, 5]
  }
};

// Validation/checkpoint issues
const VALIDATION_ISSUES = [
  {
    number: 'V1',
    title: 'Project Setup Validation Checkpoint',
    phase: 'After Chunk 1',
    description: 'Validate foundation setup and update Copilot instructions',
    dependencies: [1, 2, 3, 6]
  },
  {
    number: 'V2', 
    title: 'Core Services Validation Checkpoint',
    phase: 'After Chunk 2',
    description: 'Validate authentication and core services, review architecture',
    dependencies: [4, 7, 8]
  },
  {
    number: 'V3',
    title: 'AI Integration Validation Checkpoint', 
    phase: 'After Chunk 3',
    description: 'Validate EPUB processing and AI integration, test workflows',
    dependencies: [5, 9, 10, 11]
  },
  {
    number: 'V4',
    title: 'Voice System Validation Checkpoint',
    phase: 'After Chunk 4', 
    description: 'Validate voice management and synthesis capabilities',
    dependencies: [12, 13, 14, 15, 16, 17]
  },
  {
    number: 'V5',
    title: 'Frontend Integration Validation Checkpoint',
    phase: 'After Chunk 5',
    description: 'Validate UI integration and end-to-end workflows',
    dependencies: [18, 19, 20]
  },
  {
    number: 'V6',
    title: 'Final Quality Validation Checkpoint',
    phase: 'After Chunk 6',
    description: 'Final validation, security audit, and production readiness',
    dependencies: [21, 22, 23]
  }
];

/**
 * Parse DEVELOPMENT_ISSUES.md file to extract issue data
 */
function parseIssuesFile() {
  const issuesPath = path.join(__dirname, '..', 'DEVELOPMENT_ISSUES.md');
  const content = fs.readFileSync(issuesPath, 'utf8');
  
  const issues = {};
  const lines = content.split('\n');
  let currentIssue = null;
  let currentSection = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match issue headers
    const issueMatch = line.match(/^##+ Issue #(\d+): (.+)$/);
    if (issueMatch) {
      const number = parseInt(issueMatch[1]);
      const title = issueMatch[2];
      
      currentIssue = {
        number,
        title,
        description: '',
        tasks: [],
        acceptanceCriteria: [],
        filestoModify: [],
        epic: '',
        priority: '',
        effort: '',
        dependencies: []
      };
      
      issues[number] = currentIssue;
      continue;
    }
    
    if (!currentIssue) continue;
    
    // Parse metadata lines
    if (line.includes('**Epic**:') || line.includes('**Priority**:') || line.includes('**Effort**:') || line.includes('**Dependencies**:')) {
      const metadata = line.match(/\*\*(\w+)\*\*:\s*([^|]+)/g);
      if (metadata) {
        metadata.forEach(meta => {
          const [key, value] = meta.split('**: ');
          const cleanKey = key.replace('**', '').toLowerCase();
          const cleanValue = value.replace(/\*\*/g, '').trim();
          
          if (cleanKey === 'dependencies') {
            const deps = cleanValue.split(',').map(d => d.trim().replace('#', '')).filter(d => d && d !== 'None');
            currentIssue.dependencies = deps.map(d => parseInt(d)).filter(d => !isNaN(d));
          } else {
            currentIssue[cleanKey] = cleanValue;
          }
        });
      }
      continue;
    }
    
    // Parse dependencies - REMOVED as it's handled above
    
    // Parse sections
    if (line.startsWith('### ')) {
      currentSection = line.replace('### ', '').toLowerCase().trim();
      continue;
    }
    
    // Parse section content
    if (currentSection === 'description' && line.trim() && !line.startsWith('#') && !line.startsWith('**') && !line.startsWith('---')) {
      currentIssue.description += line + '\n';
    }
    
    if (currentSection === 'tasks' && line.startsWith('- [ ]')) {
      currentIssue.tasks.push(line.replace('- [ ] ', ''));
    }
    
    if (currentSection === 'acceptance criteria' && line.startsWith('- [ ]')) {
      currentIssue.acceptanceCriteria.push(line.replace('- [ ] ', ''));
    }
    
    if (currentSection === 'files to create/modify' && line.startsWith('- ') && !line.includes('**')) {
      currentIssue.filestoModify.push(line.replace('- ', ''));
    }
  }
  
  return issues;
}

/**
 * Format issue for GitHub creation
 */
function formatIssueForGitHub(issue, chunkInfo = null) {
  const labels = [];
  
  // Add labels based on issue properties
  if (issue.epic) labels.push(`epic:${issue.epic.toLowerCase()}`);
  if (issue.priority) labels.push(`priority:${issue.priority.toLowerCase()}`);
  if (issue.effort) labels.push(`effort:${issue.effort.toLowerCase()}`);
  if (chunkInfo) labels.push(`chunk:${chunkInfo.name.toLowerCase().replace(/\s+/g, '-')}`);
  
  let body = `${issue.description.trim()}\n\n`;
  
  // Add chunk information
  if (chunkInfo) {
    body += `## 📦 Development Chunk\n\n`;
    body += `**Chunk**: ${chunkInfo.name}\n`;
    body += `**Phase**: ${chunkInfo.description}\n`;
    body += `**Priority**: ${chunkInfo.priority}\n\n`;
  }
  
  // Add dependencies
  if (issue.dependencies && Array.isArray(issue.dependencies) && issue.dependencies.length > 0) {
    body += `## 🔗 Dependencies\n\n`;
    body += `This issue depends on: ${issue.dependencies.map(d => `#${d}`).join(', ')}\n\n`;
  }
  
  // Add tasks
  if (issue.tasks && issue.tasks.length > 0) {
    body += `## ✅ Tasks\n\n`;
    issue.tasks.forEach(task => {
      body += `- [ ] ${task}\n`;
    });
    body += '\n';
  }
  
  // Add acceptance criteria
  if (issue.acceptanceCriteria && issue.acceptanceCriteria.length > 0) {
    body += `## 🎯 Acceptance Criteria\n\n`;
    issue.acceptanceCriteria.forEach(criteria => {
      body += `- [ ] ${criteria}\n`;
    });
    body += '\n';
  }
  
  // Add files to modify
  if (issue.filestoModify && issue.filestoModify.length > 0) {
    body += `## 📁 Files to Create/Modify\n\n`;
    issue.filestoModify.forEach(file => {
      body += `- ${file}\n`;
    });
    body += '\n';
  }
  
  // Add agent guidance
  body += `## 🤖 Agent Guidance\n\n`;
  body += `- **Estimated Effort**: ${issue.effort || 'TBD'}\n`;
  body += `- **Skills Required**: ${getRequiredSkills(issue)}\n`;
  body += `- **Testing Requirements**: Unit tests, integration tests as applicable\n`;
  body += `- **Documentation**: Update relevant docs and README\n\n`;
  
  // Add validation checklist
  body += `## ✅ Definition of Done\n\n`;
  body += `- [ ] All tasks completed and tested\n`;
  body += `- [ ] Code reviewed and approved\n`;
  body += `- [ ] Documentation updated\n`;
  body += `- [ ] Integration tests passing\n`;
  body += `- [ ] No new security vulnerabilities\n`;
  body += `- [ ] Performance requirements met\n`;
  
  return {
    title: `Issue #${issue.number}: ${issue.title}`,
    body: body,
    labels: labels
  };
}

/**
 * Determine required skills based on issue content
 */
function getRequiredSkills(issue) {
  const skills = [];
  
  if (issue.title.includes('UI') || issue.title.includes('Frontend')) skills.push('React/Frontend');
  if (issue.title.includes('Database') || issue.title.includes('Schema')) skills.push('Database/SQL');
  if (issue.title.includes('AI') || issue.title.includes('LLM')) skills.push('AI/ML');
  if (issue.title.includes('Voice') || issue.title.includes('TTS')) skills.push('Audio/Voice');
  if (issue.title.includes('Auth') || issue.title.includes('Security')) skills.push('Security');
  if (issue.title.includes('API') || issue.title.includes('Gateway')) skills.push('Backend/API');
  if (issue.title.includes('Docker') || issue.title.includes('CI/CD')) skills.push('DevOps');
  if (issue.title.includes('Test')) skills.push('Testing');
  
  return skills.length > 0 ? skills.join(', ') : 'General Development';
}

/**
 * Format validation issue for GitHub
 */
function formatValidationIssue(validation) {
  const labels = ['validation', 'checkpoint', 'priority:high'];
  
  let body = `This is a validation checkpoint to ensure project quality and validate Copilot instructions.\n\n`;
  
  body += `## 🎯 Validation Phase\n\n`;
  body += `**Phase**: ${validation.phase}\n`;
  body += `**Focus**: ${validation.description}\n\n`;
  
  body += `## 🔗 Dependencies\n\n`;
  body += `This validation depends on completion of: ${validation.dependencies.map(d => `#${d}`).join(', ')}\n\n`;
  
  body += `## ✅ Validation Tasks\n\n`;
  body += `- [ ] Review completed issues for quality and completeness\n`;
  body += `- [ ] Test integration between completed components\n`;
  body += `- [ ] Validate architecture decisions and implementation\n`;
  body += `- [ ] Update Copilot instructions based on learnings\n`;
  body += `- [ ] Review and update documentation\n`;
  body += `- [ ] Identify and document any technical debt\n`;
  body += `- [ ] Plan adjustments for remaining work\n`;
  body += `- [ ] Validate security and performance considerations\n\n`;
  
  body += `## 🎯 Success Criteria\n\n`;
  body += `- [ ] All dependent issues are completed and validated\n`;
  body += `- [ ] Integration tests are passing\n`;
  body += `- [ ] Code quality metrics are met\n`;
  body += `- [ ] Documentation is current and accurate\n`;
  body += `- [ ] Copilot instructions are updated and validated\n`;
  body += `- [ ] Team is ready to proceed to next phase\n\n`;
  
  body += `## 🤖 Agent Guidance\n\n`;
  body += `- **Role**: Project Manager/QA Agent\n`;
  body += `- **Focus**: Quality assurance and process improvement\n`;
  body += `- **Duration**: 1-2 days\n`;
  body += `- **Deliverables**: Validation report, updated instructions, go/no-go decision\n`;
  
  return {
    title: validation.title,
    body: body,
    labels: labels
  };
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 VoxFoundry GitHub Issues Creation Script');
  console.log('==========================================\n');
  
  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No issues will be created\n');
  }
  
  if (!GITHUB_TOKEN && !DRY_RUN) {
    console.error('❌ GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }
  
  // Parse issues from file
  console.log('📖 Parsing DEVELOPMENT_ISSUES.md...');
  const issues = parseIssuesFile();
  console.log(`Found ${Object.keys(issues).length} issues\n`);
  
  // Create issue templates
  const templates = [];
  
  if (VALIDATION_ONLY) {
    // Create only validation issues
    console.log('🔍 Creating validation issues only...\n');
    VALIDATION_ISSUES.forEach(validation => {
      const template = formatValidationIssue(validation);
      templates.push(template);
      
      if (DRY_RUN) {
        console.log(`📋 ${template.title}`);
        console.log(`Labels: ${template.labels.join(', ')}`);
        console.log(`Body length: ${template.body.length} characters\n`);
      }
    });
  } else {
    // Create development issues by chunk
    Object.keys(ISSUE_CHUNKS).forEach(chunkNum => {
      if (CHUNK_FILTER && CHUNK_FILTER !== chunkNum) return;
      
      const chunk = ISSUE_CHUNKS[chunkNum];
      console.log(`📦 Processing Chunk ${chunkNum}: ${chunk.name}`);
      
      chunk.issues.forEach(issueNum => {
        const issue = issues[issueNum];
        if (!issue) {
          console.warn(`⚠️  Issue #${issueNum} not found in parsed data`);
          return;
        }
        
        const template = formatIssueForGitHub(issue, chunk);
        templates.push(template);
        
        if (DRY_RUN) {
          console.log(`  📋 ${template.title}`);
          console.log(`     Labels: ${template.labels.join(', ')}`);
        }
      });
      
      console.log(`   ✅ ${chunk.issues.length} issues processed\n`);
    });
  }
  
  // Save templates to files for manual creation if needed
  const outputDir = path.join(__dirname, '..', 'github-issues');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`💾 Saving ${templates.length} issue templates to ${outputDir}/`);
  templates.forEach((template, index) => {
    const filename = `${String(index + 1).padStart(2, '0')}-${template.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.md`;
    const filepath = path.join(outputDir, filename);
    
    let content = `# ${template.title}\n\n`;
    content += `**Labels**: ${template.labels.join(', ')}\n\n`;
    content += `---\n\n`;
    content += template.body;
    
    fs.writeFileSync(filepath, content);
  });
  
  console.log('\n✅ Issue templates created successfully!');
  console.log('\n📝 Next Steps:');
  console.log('1. Review the generated templates in github-issues/');
  console.log('2. Create issues manually in GitHub or use GitHub CLI:');
  console.log('   gh issue create --title "Title" --body-file template.md --label "label1,label2"');
  console.log('3. Start with Chunk 1 (Foundation) issues first');
  console.log('4. Create validation issues after each chunk completion');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { 
  parseIssuesFile, 
  formatIssueForGitHub, 
  formatValidationIssue,
  ISSUE_CHUNKS,
  VALIDATION_ISSUES
};