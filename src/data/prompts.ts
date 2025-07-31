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
  },
  {
    id: "11",
    title: "Production Issue Triaging",
    description: "Step-by-step methodology for triaging critical production issues",
    prompt: `Production Issue Triaging Protocol - Follow this systematic approach:

**Phase 1: Initial Assessment (First 5 minutes)**
1. Determine severity level (P0/P1/P2/P3)
2. Identify affected user percentage and business impact
3. Check if issue is widespread or isolated
4. Verify if it's a new deployment related issue
5. Establish incident commander if P0/P1

**Phase 2: Information Gathering (5-15 minutes)**
□ Collect error logs from all relevant services
□ Check monitoring dashboards for anomalies
□ Verify database connection and query performance
□ Review recent deployments and configuration changes
□ Check third-party service status and dependencies
□ Gather user reports and reproduce the issue

**Phase 3: Root Cause Investigation (15-45 minutes)**
□ Analyze error patterns and frequency
□ Trace request flow through system components
□ Check resource utilization (CPU, memory, disk, network)
□ Review application metrics and business KPIs
□ Examine infrastructure health and scaling events
□ Investigate data corruption or inconsistencies

**Phase 4: Resolution Strategy**
□ Implement immediate workaround if available
□ Plan permanent fix with risk assessment
□ Prepare rollback strategy
□ Coordinate with stakeholders on communication
□ Document findings and resolution steps

Issue Details: [INSERT ISSUE DESCRIPTION]
Error Logs: [INSERT ERROR LOGS]
Monitoring Data: [INSERT MONITORING INFO]

Work through each phase systematically and document your findings.`,
    category: "Step-by-Step",
    domain: "General",
    useCase: "Systematic triaging of production incidents and critical issues",
    example: "Use this for P0/P1 incidents, performance degradations, or system outages",
    tags: ["Incident Response", "Production", "Triaging", "Issue Resolution"]
  },
  {
    id: "12",
    title: "CPU Performance Analysis",
    description: "Comprehensive CPU utilization analysis and optimization guide",
    prompt: `Act as a performance engineer specializing in CPU optimization. Analyze the following system for CPU performance issues:

**CPU Analysis Framework:**

🔍 **Profiling & Measurement:**
- Identify CPU hotspots using profiling tools
- Measure CPU usage patterns (peaks, averages, sustained load)
- Analyze thread utilization and concurrency patterns
- Profile memory access patterns affecting CPU cache
- Benchmark critical code paths under load

⚡ **Optimization Strategies:**
- Algorithm optimization (Big O complexity reduction)
- Loop optimization and vectorization opportunities
- Function call overhead reduction
- Branch prediction optimization
- CPU cache locality improvements
- Parallel processing opportunities

🛠 **Implementation Analysis:**
- Review computational complexity of core functions
- Identify unnecessary computations and redundant operations
- Analyze synchronization overhead and lock contention
- Evaluate garbage collection impact on CPU
- Assess third-party library CPU usage

📊 **Monitoring & Validation:**
- Set up CPU performance metrics and alerting
- Establish baseline performance measurements
- Create load testing scenarios for validation
- Implement performance regression detection

System Details: [INSERT SYSTEM INFO]
Current CPU Metrics: [INSERT CPU DATA]
Performance Requirements: [INSERT REQUIREMENTS]

Provide specific, actionable recommendations with expected performance gains.`,
    category: "Role-Based",
    domain: "Backend",
    useCase: "CPU performance analysis and optimization for high-performance systems",
    example: "Use for optimizing CPU-intensive applications, reducing server costs, improving response times",
    tags: ["Performance", "CPU Optimization", "Profiling", "System Analysis"]
  },
  {
    id: "13",
    title: "Memory Leak Detection & Optimization",
    description: "Systematic approach to memory usage analysis and leak detection",
    prompt: `Memory Optimization Investigation - Follow this methodology:

**Step 1: Memory Profiling Setup**
- Configure memory profiling tools (heap dumps, memory trackers)
- Establish baseline memory usage patterns
- Set up continuous memory monitoring
- Identify memory growth trends over time

**Step 2: Memory Pattern Analysis**
- Analyze heap composition and object lifecycle
- Identify memory allocation hotspots
- Review garbage collection patterns and frequency
- Examine memory fragmentation issues
- Track memory usage across different application states

**Step 3: Leak Detection Protocol**
□ Monitor memory growth during idle periods
□ Perform repeated operations to identify cumulative leaks
□ Analyze object retention graphs and references
□ Check for event listener leaks and unclosed resources
□ Review caching strategies and expiration policies
□ Investigate closure-related memory retention

**Step 4: Optimization Implementation**
□ Object pooling for frequently created/destroyed objects
□ Weak references for cache implementations
□ Proper resource cleanup (connections, streams, timers)
□ Memory-efficient data structures selection
□ Lazy loading and pagination strategies
□ Compression and serialization optimization

**Step 5: Validation & Monitoring**
□ Load testing with memory stress scenarios
□ Long-running stability tests
□ Memory usage alerting thresholds
□ Performance regression detection

Application Type: [INSERT APP TYPE]
Current Memory Issues: [INSERT MEMORY DATA]
Technology Stack: [INSERT TECH STACK]

Provide detailed analysis and specific optimization recommendations.`,
    category: "Step-by-Step",
    domain: "Backend",
    useCase: "Memory leak detection, optimization, and resource management",
    example: "Use for applications with memory growth issues, high memory usage, or frequent OOM errors",
    tags: ["Memory Management", "Performance", "Leak Detection", "Resource Optimization"]
  },
  {
    id: "14",
    title: "Frontend Performance Bottleneck Analysis",
    description: "Chain-of-thought analysis for frontend performance issues",
    prompt: `Analyze frontend performance bottlenecks step by step:

**Step 1: Identify Performance Symptoms**
First, let's understand what performance issues users are experiencing:
- Page load times and Time to First Byte (TTFB)
- First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS) and interaction delays
- JavaScript execution blocking and render delays

**Step 2: Resource Analysis**
Now, let's examine resource loading patterns:
- Bundle size analysis and code splitting effectiveness
- Image optimization and lazy loading implementation
- CSS delivery and critical path rendering
- Third-party script impact and loading strategies
- Caching effectiveness and cache hit rates

**Step 3: Runtime Performance Investigation**
Next, analyze how the application performs during user interaction:
- Component re-rendering frequency and efficiency
- State management impact on performance
- Memory usage and garbage collection patterns
- Main thread blocking and long tasks
- Animation performance and frame rates

**Step 4: Network and Delivery Optimization**
Then, evaluate content delivery performance:
- CDN effectiveness and geographic distribution
- Compression ratios and encoding efficiency
- HTTP/2 utilization and connection optimization
- Preloading strategies and resource hints
- Service worker caching strategies

**Step 5: User Experience Impact Assessment**
Finally, measure the business impact:
- Conversion rate correlation with performance metrics
- User engagement metrics and bounce rates
- Mobile vs desktop performance differences
- Performance budget compliance

Application URL: [INSERT URL]
Performance Metrics: [INSERT METRICS]
Technology Stack: [INSERT TECH STACK]

Work through each step to identify the root causes and prioritize optimizations.`,
    category: "Chain-of-Thought",
    domain: "Frontend",
    useCase: "Systematic frontend performance analysis and optimization",
    example: "Use for slow loading websites, poor Core Web Vitals, or user experience issues",
    tags: ["Frontend Performance", "Web Vitals", "Optimization", "User Experience"]
  },
  {
    id: "15",
    title: "Database Performance Triaging",
    description: "Template-based approach for database performance issues",
    prompt: `Database Performance Issue Investigation Template:

**Issue Summary:**
- Database Type: [PostgreSQL/MySQL/MongoDB/etc.]
- Issue Description: [Slow queries/High CPU/Connection issues]
- Affected Operations: [READ/WRITE/BOTH]
- Time of Occurrence: [When did this start?]
- Business Impact: [Users affected/Revenue impact]

**Performance Metrics Collection:**
□ Query execution times and frequency
□ Database CPU and memory utilization
□ Disk I/O patterns and storage performance
□ Connection pool utilization
□ Lock contention and blocking queries
□ Index utilization and scan ratios

**Query Analysis Checklist:**
□ Identify slow-running queries (>1 second)
□ Analyze query execution plans
□ Check for missing or ineffective indexes
□ Review JOIN operations and complexity
□ Examine WHERE clause selectivity
□ Validate data type consistency

**System Resource Investigation:**
□ Check available memory and buffer pool usage
□ Monitor disk space and I/O latency
□ Analyze network connectivity and bandwidth
□ Review backup and maintenance job schedules
□ Examine transaction log growth patterns

**Resolution Strategy:**
□ Index optimization recommendations
□ Query rewriting opportunities
□ Partitioning or archiving strategies
□ Hardware scaling considerations
□ Configuration tuning parameters

**Monitoring Setup:**
□ Query performance tracking
□ Resource utilization alerts
□ Slow query logging configuration
□ Performance baseline establishment

Database Version: [INSERT VERSION]
Current Metrics: [INSERT METRICS]
Problematic Queries: [INSERT QUERIES]

Fill out this template to systematically diagnose and resolve database performance issues.`,
    category: "Template-Based",
    domain: "Backend",
    useCase: "Systematic database performance investigation and optimization",
    example: "Use for slow database queries, high resource usage, or connection issues",
    tags: ["Database Performance", "Query Optimization", "Resource Management", "Troubleshooting"]
  },
  {
    id: "16",
    title: "Code Quality & Performance Review",
    description: "Constraint-based code review focusing on performance implications",
    prompt: `Performance-Focused Code Review - Apply these strict constraints:

**MANDATORY PERFORMANCE CHECKS:**
✓ Time complexity analysis (O(n), O(log n), etc.)
✓ Space complexity evaluation and memory efficiency
✓ I/O operation optimization and async patterns
✓ Database query efficiency and N+1 problem prevention
✓ Caching strategy implementation and cache invalidation
✓ Resource cleanup and memory leak prevention

**PERFORMANCE CONSTRAINTS:**
- No synchronous operations in async contexts
- Maximum response time must be under [X]ms
- Memory usage must not exceed [X]MB per operation
- Database queries must use appropriate indexes
- All loops must have complexity justification
- No blocking operations on main thread

**CPU EFFICIENCY REQUIREMENTS:**
□ Algorithm choice justification for data processing
□ Unnecessary computation elimination
□ Efficient data structure selection
□ Parallel processing utilization where appropriate
□ Function call overhead minimization

**MEMORY EFFICIENCY REQUIREMENTS:**
□ Object lifecycle management
□ Proper resource disposal patterns
□ Memory pool utilization for frequent allocations
□ Lazy loading implementation for large data sets
□ Reference management to prevent leaks

**SCALABILITY CONSTRAINTS:**
□ Horizontal scaling compatibility
□ Stateless operation design
□ Connection pooling and resource sharing
□ Load distribution consideration
□ Graceful degradation under high load

Code to Review: [INSERT CODE]
Performance Requirements: [INSERT REQUIREMENTS]
Expected Load: [INSERT LOAD SPECS]

Evaluate each constraint and provide specific performance improvement recommendations.`,
    category: "Constraint-Based",
    domain: "General",
    useCase: "Performance-focused code reviews with strict efficiency requirements",
    example: "Use for high-performance systems, resource-constrained environments, or optimization projects",
    tags: ["Code Review", "Performance", "Optimization", "Scalability", "Efficiency"]
  },
  {
    id: "17",
    title: "System Bottleneck Identification",
    description: "Few-shot learning approach for bottleneck analysis across different systems",
    prompt: `Identify system bottlenecks using these proven analysis patterns:

**Example 1 - E-commerce Platform Bottleneck:**
Problem: Checkout process takes 15+ seconds during peak hours
Analysis: Database connection pool exhaustion due to long-running payment API calls
Solution: Implement async payment processing with connection pooling optimization
Result: Reduced checkout time to 3 seconds

**Example 2 - Real-time Analytics Dashboard:**
Problem: Dashboard updates lag by 5+ minutes with high CPU usage
Analysis: Inefficient data aggregation queries running synchronously
Solution: Pre-computed materialized views with incremental updates
Result: Real-time updates with 90% CPU reduction

**Example 3 - Microservices Communication:**
Problem: API response times degrade under load with cascading failures
Analysis: Synchronous service calls without circuit breakers
Solution: Async messaging with circuit breaker pattern and timeouts
Result: Improved resilience and 70% faster response times

**Example 4 - Image Processing Service:**
Problem: Memory usage spikes causing OOM errors during batch processing
Analysis: Loading entire image datasets into memory simultaneously
Solution: Streaming processing with memory-mapped files and batching
Result: Constant memory usage regardless of batch size

Now analyze your system using similar patterns:

System Description: [INSERT SYSTEM DETAILS]
Performance Symptoms: [INSERT SYMPTOMS]
Current Architecture: [INSERT ARCHITECTURE]
Load Patterns: [INSERT LOAD INFO]

Following the examples above, identify:
1. The specific bottleneck location
2. Root cause analysis
3. Proposed solution approach
4. Expected performance improvement

Provide detailed analysis with metrics and implementation strategy.`,
    category: "Few-Shot Learning",
    domain: "Architecture",
    useCase: "Systematic bottleneck identification across various system architectures",
    example: "Use for performance issues in complex systems, scalability problems, or resource optimization",
    tags: ["Bottleneck Analysis", "System Performance", "Architecture", "Optimization"]
  },
  {
    id: "18",
    title: "Load Testing Strategy & Analysis",
    description: "Iterative refinement approach for comprehensive load testing",
    prompt: `Design and refine load testing strategy through multiple iterations:

**Iteration 1: Test Planning & Baseline**
- Define performance requirements and SLA targets
- Identify critical user journeys and business transactions
- Establish baseline performance metrics
- Design realistic load patterns and user behavior simulation
- Set up monitoring and data collection infrastructure

**Iteration 2: Initial Load Testing**
- Execute basic load tests with gradual traffic increase
- Monitor system behavior under normal and peak load
- Identify initial performance bottlenecks and failure points
- Collect comprehensive metrics across all system components
- Document performance degradation patterns

**Iteration 3: Stress Testing & Analysis**
- Push system beyond expected capacity limits
- Identify breaking points and failure modes
- Analyze resource utilization patterns under extreme load
- Test recovery mechanisms and graceful degradation
- Evaluate system stability and error handling

**Iteration 4: Optimization & Validation**
- Implement performance improvements based on findings
- Re-run tests to validate optimization effectiveness
- Conduct endurance testing for sustained load scenarios
- Verify scalability improvements and resource efficiency
- Create performance regression test suite

**Iteration 5: Production Readiness**
- Conduct final validation with production-like scenarios
- Establish monitoring and alerting for production deployment
- Create performance troubleshooting runbooks
- Define capacity planning and scaling triggers
- Document performance characteristics and recommendations

Application Type: [INSERT APP TYPE]
Expected Traffic: [INSERT TRAFFIC PATTERNS]
Performance Requirements: [INSERT SLA REQUIREMENTS]
Infrastructure: [INSERT INFRASTRUCTURE DETAILS]

Work through each iteration, building upon previous findings to create a comprehensive load testing strategy.`,
    category: "Iterative Refinement",
    domain: "QA/Testing",
    useCase: "Comprehensive load testing strategy development and performance validation",
    example: "Use for pre-production performance testing, capacity planning, or system optimization validation",
    tags: ["Load Testing", "Performance Testing", "Scalability", "Capacity Planning"]
  },
  {
    id: "19",
    title: "Zero-Downtime Deployment Troubleshooting",
    description: "Zero-shot prompt for deployment-related performance issues",
    prompt: `Troubleshoot zero-downtime deployment performance issues. Analyze and resolve:

🚀 **Deployment Strategy Analysis:**
- Blue-green deployment health and traffic routing
- Rolling deployment performance during updates
- Canary deployment metrics and rollback triggers
- Load balancer configuration and health checks
- Container orchestration and resource allocation

⚙️ **Performance Impact Assessment:**
- Application startup time and initialization delays
- Database migration impact on performance
- Caching layer invalidation and warming strategies
- CDN cache purging and content distribution
- Session management during deployment transitions

🔄 **Traffic Management Issues:**
- Load balancer sticky session handling
- Connection draining and graceful shutdown
- Circuit breaker behavior during deployments
- Rate limiting adjustments for new versions
- API versioning and backward compatibility

📊 **Monitoring & Validation:**
- Real-time performance metrics during deployment
- Error rate monitoring and anomaly detection
- Resource utilization tracking across versions
- User experience impact measurement
- Rollback criteria and automated triggers

🛠️ **Infrastructure Considerations:**
- Container resource limits and auto-scaling
- Database connection pool management
- File system and storage performance
- Network configuration and security groups
- Logging and observability during transitions

Deployment Details: [INSERT DEPLOYMENT INFO]
Performance Issues: [INSERT ISSUES]
Infrastructure Setup: [INSERT INFRASTRUCTURE]

Provide comprehensive troubleshooting steps and optimization recommendations.`,
    category: "Zero-Shot",
    domain: "DevOps",
    useCase: "Troubleshooting performance issues during zero-downtime deployments",
    example: "Use for deployment performance problems, rollback scenarios, or infrastructure optimization",
    tags: ["Deployment", "Zero-Downtime", "Performance", "Infrastructure", "Troubleshooting"]
  },
  {
    id: "20",
    title: "Application Resource Monitoring Setup",
    description: "Role-based prompt for comprehensive application monitoring",
    prompt: `Act as a Site Reliability Engineer (SRE) with expertise in application monitoring. Design a comprehensive monitoring strategy for resource utilization and performance tracking:

**CPU & Memory Monitoring:**
- Real-time CPU usage tracking with percentile analysis
- Memory consumption patterns and leak detection
- Garbage collection frequency and duration monitoring
- Thread pool utilization and concurrency metrics
- Process-level resource allocation tracking

**Application Performance Metrics:**
- Response time percentiles (P50, P95, P99)
- Throughput measurements and transaction rates
- Error rates and failure pattern analysis
- Business transaction monitoring and tracing
- Custom application metrics and KPIs

**Infrastructure Resource Tracking:**
- Server-level CPU, memory, disk, and network utilization
- Container resource consumption and limits
- Database performance and connection pool metrics
- Cache hit rates and storage efficiency
- Load balancer performance and distribution

**Alerting & Notification Strategy:**
- Threshold-based alerts for resource utilization
- Anomaly detection for performance degradation
- Cascading failure prevention and circuit breakers
- Escalation policies and on-call procedures
- Business impact correlation and prioritization

**Observability Implementation:**
- Distributed tracing for microservices
- Structured logging with correlation IDs
- Custom dashboards for different stakeholders
- Performance trend analysis and capacity planning
- Root cause analysis automation

Application Architecture: [INSERT ARCHITECTURE]
Technology Stack: [INSERT TECH STACK]
Expected Load: [INSERT LOAD REQUIREMENTS]
Business SLAs: [INSERT SLA REQUIREMENTS]

Provide a detailed monitoring implementation plan with specific tools, metrics, and alert configurations.`,
    category: "Role-Based",
    domain: "DevOps",
    useCase: "Comprehensive application monitoring and observability setup",
    example: "Use for production monitoring setup, performance tracking, or SRE implementation",
    tags: ["Monitoring", "Observability", "SRE", "Performance Tracking", "Alerting"]
  }
];