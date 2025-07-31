export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: PromptCategory;
  domain: Domain;
  useCase: string;
  example?: string;
  tags: string[];
}

export type PromptCategory = 
  | "Chain-of-Thought"
  | "Few-Shot Learning"
  | "Zero-Shot"
  | "Role-Based"
  | "Step-by-Step"
  | "Template-Based"
  | "Iterative Refinement"
  | "Constraint-Based";

export type Domain = 
  | "Frontend"
  | "Backend"
  | "Architecture"
  | "QA/Testing"
  | "DevOps"
  | "General";

export const promptCategories: PromptCategory[] = [
  "Chain-of-Thought",
  "Few-Shot Learning",
  "Zero-Shot",
  "Role-Based",
  "Step-by-Step",
  "Template-Based",
  "Iterative Refinement",
  "Constraint-Based"
];

export const domains: Domain[] = [
  "Frontend",
  "Backend",
  "Architecture",
  "QA/Testing",
  "DevOps",
  "General"
];

export const prompts: Prompt[] = [
  {
    id: "1",
    title: "React Component Code Review",
    description: "Chain-of-thought prompt for thorough React component analysis",
    prompt: `Please review this React component step by step:

1. First, analyze the component structure and identify its purpose
2. Check for proper TypeScript typing and interfaces
3. Evaluate the component's performance implications
4. Review accessibility considerations
5. Assess the component's reusability and maintainability
6. Identify any potential bugs or security issues
7. Suggest improvements with explanations

Component code: [INSERT CODE HERE]

Please provide your analysis following each step above.`,
    category: "Chain-of-Thought",
    domain: "Frontend",
    useCase: "Code review and quality assurance for React components",
    example: "Use this when reviewing React components for performance, accessibility, and best practices",
    tags: ["React", "TypeScript", "Code Review", "Performance"]
  },
  {
    id: "2",
    title: "API Design Role-Based Prompt",
    description: "Role-based prompt for comprehensive API design",
    prompt: `Act as a senior backend architect with 10+ years of experience designing scalable APIs. You are tasked with designing a RESTful API for [DESCRIBE SYSTEM].

Consider the following aspects:
- Authentication and authorization strategy
- Rate limiting and throttling
- Data validation and sanitization
- Error handling and status codes
- Documentation standards
- Caching strategies
- Database design implications
- Security best practices

Provide a detailed API specification including endpoints, request/response schemas, and implementation considerations.`,
    category: "Role-Based",
    domain: "Backend",
    useCase: "Designing comprehensive and scalable API architectures",
    example: "Use this when designing APIs for new features or refactoring existing endpoints",
    tags: ["API Design", "REST", "Architecture", "Security"]
  },
  {
    id: "3",
    title: "Test Case Generation - Few Shot",
    description: "Few-shot learning prompt for generating comprehensive test cases",
    prompt: `Generate comprehensive test cases for the given feature. Here are examples of good test cases:

Example 1 - Login Feature:
- Valid credentials login (positive)
- Invalid password (negative) 
- Non-existent user (negative)
- Empty fields validation (boundary)
- SQL injection attempt (security)
- Rate limiting test (performance)

Example 2 - Shopping Cart:
- Add item to empty cart (positive)
- Add duplicate items (edge case)
- Remove last item (boundary)
- Exceed maximum quantity (boundary)
- Cart persistence across sessions (integration)

Now generate similar comprehensive test cases for: [FEATURE DESCRIPTION]

Include positive, negative, boundary, edge cases, security, and performance tests.`,
    category: "Few-Shot Learning",
    domain: "QA/Testing",
    useCase: "Generating comprehensive test cases for any feature",
    example: "Use this to quickly generate thorough test coverage for new features",
    tags: ["Test Cases", "QA", "Testing Strategy", "Coverage"]
  },
  {
    id: "4",
    title: "System Architecture Analysis",
    description: "Step-by-step system architecture evaluation",
    prompt: `Analyze the following system architecture step by step:

Step 1: Identify all components and their responsibilities
Step 2: Evaluate data flow and communication patterns
Step 3: Assess scalability bottlenecks and solutions
Step 4: Review security implications and vulnerabilities
Step 5: Identify single points of failure
Step 6: Evaluate monitoring and observability
Step 7: Assess cost implications and optimization opportunities
Step 8: Provide recommendations for improvements

Architecture description: [INSERT ARCHITECTURE DETAILS]

Please work through each step systematically and provide detailed analysis.`,
    category: "Step-by-Step",
    domain: "Architecture",
    useCase: "Comprehensive system architecture review and optimization",
    example: "Use this for architecture reviews, system design interviews, or planning system improvements",
    tags: ["System Design", "Architecture", "Scalability", "Security"]
  },
  {
    id: "5",
    title: "Bug Investigation Template",
    description: "Template-based approach for systematic bug investigation",
    prompt: `Bug Investigation Report Template:

**Bug Summary:**
- Title: [Brief description]
- Severity: [Critical/High/Medium/Low]
- Environment: [Production/Staging/Development]

**Reproduction Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected vs Actual Behavior:**
- Expected: [What should happen]
- Actual: [What actually happens]

**Investigation Checklist:**
□ Check error logs and stack traces
□ Verify data integrity and state
□ Test in different environments
□ Review recent code changes
□ Check third-party service status
□ Validate user permissions and authentication
□ Test with different user roles/data sets

**Technical Analysis:**
- Root cause: [Identified cause]
- Impact assessment: [Who/what is affected]
- Fix complexity: [Simple/Medium/Complex]

**Resolution Plan:**
- Immediate fix: [Quick resolution if needed]
- Long-term solution: [Proper fix]
- Prevention measures: [How to prevent recurrence]

Please fill out this template for the following bug: [BUG DESCRIPTION]`,
    category: "Template-Based",
    domain: "QA/Testing",
    useCase: "Systematic bug investigation and documentation",
    example: "Use this template for any bug report to ensure thorough investigation",
    tags: ["Bug Investigation", "Documentation", "QA", "Process"]
  },
  {
    id: "6",
    title: "Database Query Optimization",
    description: "Iterative refinement prompt for database performance",
    prompt: `Let's optimize this database query through iterative refinement:

Initial Query: [INSERT QUERY]

Iteration 1: Analyze the current query
- Identify potential performance issues
- Check for missing indexes
- Look for unnecessary JOINs or subqueries

Iteration 2: Propose optimizations
- Suggest index improvements
- Rewrite complex parts
- Consider query structure changes

Iteration 3: Validate improvements
- Explain expected performance gains
- Identify any trade-offs
- Suggest monitoring approaches

Iteration 4: Final refinement
- Handle edge cases
- Ensure maintainability
- Document the optimization

Please work through each iteration, building upon the previous analysis.`,
    category: "Iterative Refinement",
    domain: "Backend",
    useCase: "Optimizing database queries for better performance",
    example: "Use this when dealing with slow queries or database performance issues",
    tags: ["Database", "Performance", "SQL", "Optimization"]
  },
  {
    id: "7",
    title: "Security-Focused Code Review",
    description: "Constraint-based prompt for security-first code analysis",
    prompt: `Review this code with security as the primary constraint. You must:

MANDATORY SECURITY CHECKS:
✓ Input validation and sanitization
✓ SQL injection prevention
✓ XSS vulnerability assessment
✓ Authentication and authorization
✓ Data exposure and privacy
✓ Rate limiting and DoS protection
✓ Secure error handling
✓ Dependency vulnerability scan

SECURITY CONSTRAINTS:
- No user input should be trusted without validation
- All database queries must use parameterized statements
- Sensitive data must be properly encrypted
- Error messages must not leak sensitive information
- All endpoints must have proper authentication
- Rate limiting must be implemented for public endpoints

Code to review: [INSERT CODE]

Provide a security assessment that addresses each mandatory check and constraint.`,
    category: "Constraint-Based",
    domain: "Backend",
    useCase: "Security-focused code reviews and vulnerability assessment",
    example: "Use this for security audits or when reviewing code handling sensitive data",
    tags: ["Security", "Code Review", "Vulnerabilities", "Best Practices"]
  },
  {
    id: "8",
    title: "Frontend Performance Audit",
    description: "Zero-shot prompt for frontend performance analysis",
    prompt: `Conduct a comprehensive frontend performance audit. Analyze the following areas and provide actionable recommendations:

🚀 Loading Performance:
- Bundle size and optimization
- Code splitting opportunities
- Image optimization
- Critical resource prioritization

⚡ Runtime Performance:
- Component rendering efficiency
- Memory usage patterns
- JavaScript execution optimization
- CSS performance impact

📱 User Experience:
- Core Web Vitals assessment
- Accessibility performance
- Mobile optimization
- Progressive enhancement

🔧 Optimization Strategies:
- Lazy loading implementation
- Caching strategies
- CDN utilization
- Performance monitoring setup

Application details: [INSERT APP DETAILS]

Provide specific, actionable recommendations for each area.`,
    category: "Zero-Shot",
    domain: "Frontend",
    useCase: "Complete frontend performance analysis and optimization",
    example: "Use this for performance audits of web applications",
    tags: ["Performance", "Frontend", "Optimization", "Web Vitals"]
  },
  {
    id: "9",
    title: "DevOps Pipeline Design",
    description: "Role-based prompt for CI/CD pipeline architecture",
    prompt: `As a DevOps engineer with expertise in modern CI/CD practices, design a comprehensive deployment pipeline for [PROJECT TYPE].

Consider these requirements:
- Multi-environment deployment (dev, staging, prod)
- Automated testing integration
- Security scanning and compliance
- Infrastructure as Code (IaC)
- Monitoring and observability
- Rollback strategies
- Branch-based deployment strategies

Pipeline stages to design:
1. Source control integration
2. Build and compilation
3. Automated testing (unit, integration, e2e)
4. Security and quality scans
5. Artifact creation and storage
6. Deployment automation
7. Post-deployment verification
8. Monitoring and alerting

Provide a detailed pipeline configuration with tools recommendations and best practices.`,
    category: "Role-Based",
    domain: "DevOps",
    useCase: "Designing comprehensive CI/CD pipelines",
    example: "Use this when setting up deployment pipelines for new projects",
    tags: ["CI/CD", "DevOps", "Automation", "Infrastructure"]
  },
  {
    id: "10",
    title: "Microservices Communication Design",
    description: "Chain-of-thought prompt for service communication patterns",
    prompt: `Design communication patterns for microservices step by step:

Step 1: Identify service boundaries and responsibilities
- What does each service own?
- What are the business capabilities?
- How should data be partitioned?

Step 2: Determine communication patterns
- Synchronous vs asynchronous communication
- Request-response vs event-driven patterns
- API contracts and versioning strategy

Step 3: Design data consistency strategies
- Eventual consistency vs strong consistency
- Saga patterns for distributed transactions
- Event sourcing considerations

Step 4: Plan for failure scenarios
- Circuit breaker patterns
- Retry strategies and backoff
- Timeout configurations

Step 5: Implement observability
- Distributed tracing
- Service health monitoring
- Performance metrics

Services to design: [INSERT SERVICE DESCRIPTIONS]

Work through each step systematically.`,
    category: "Chain-of-Thought",
    domain: "Architecture",
    useCase: "Designing communication patterns for microservices architecture",
    example: "Use this when transitioning from monolith to microservices or designing new distributed systems",
    tags: ["Microservices", "Architecture", "Communication", "Distributed Systems"]
  }
];