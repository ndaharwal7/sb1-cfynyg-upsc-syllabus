// Diagram Templates
const templates = {
    travel: `graph LR
    A[Travel] --> B[Adventure]
    A --> C[Exploration]
    A --> D[Culture]
    A --> E[Destination]
    A --> F[Journey]`,
    
    development: `gitGraph
    commit id: "1"
    commit id: "2"
    branch develop
    checkout develop
    commit id: "3"
    commit id: "4"
    checkout main
    merge develop
    commit id: "5"`,
    
    architecture: `classDiagram
    class User {
        +String username
        +String email
        +login()
        +logout()
    }
    class System {
        +validate()
        +process()
    }
    User --> System`,
    
    userFlow: `stateDiagram-v2
    [*] --> Login
    Login --> Dashboard
    Dashboard --> Profile
    Dashboard --> Settings
    Settings --> Dashboard
    Profile --> Dashboard
    Dashboard --> [*]`,

    upsc: `flowchart TD
    subgraph MainFlow
        A[Start: Apply for UPSC Civil Services Exam] --> B[Preliminary Examination]
        B --> C[Prelims Result Announced]
        C -->|Qualify| D[Mains Examination]
        C -->|Not Qualify| E[End: Prepare for Next Attempt]
        D --> F[Mains Result Announced]
        F -->|Qualify| G[Personality Test Interview]
        F -->|Not Qualify| E
        G --> H[Final Result Announced]
        H --> I[End: Selection for Civil Services]
    end

    subgraph PrelimSection[Preliminary Examination Details]
        direction LR
        P1[Paper I: General Studies] --> P2[History]
        P1 --> P3[Geography]
        P1 --> P4[Polity]
        P1 --> P5[Economy]
        P1 --> P6[Environment]
        P7[Paper II: CSAT] --> P8[Comprehension]
        P7 --> P9[Reasoning]
        P7 --> P10[Aptitude]
    end

    subgraph MainsSection[Mains Examination Details]
        direction LR
        M1[Compulsory Papers] --> M2[Indian Language]
        M1 --> M3[English]
        M1 --> M4[Essay]
        M1 --> M5[General Studies]
        M6[Optional Subject] --> M7[Paper 1]
        M6 --> M8[Paper 2]
    end

    subgraph InterviewSection[Interview Components]
        direction LR
        I1[Personality Test] --> I2[Knowledge Assessment]
        I1 --> I3[Communication Skills]
        I1 --> I4[Problem Solving]
        I1 --> I5[Leadership Qualities]
    end

    B -.-> PrelimSection
    D -.-> MainsSection
    G -.-> InterviewSection`,
};

// Diagram Type Templates
const diagramTemplates = {
    flowchart: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process 1]
    B -->|No| D[Process 2]
    C --> E[End]
    D --> E
    
    subgraph Process Details
        direction TB
        P1[Step 1] --> P2[Step 2]
        P2 --> P3[Step 3]
    end
    
    C --> Process Details`,
    
    sequence: `sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request Data
    System->>Database: Query
    Database-->>System: Results
    System-->>User: Response
    
    note over System: Processing...
    
    alt Success
        User->>System: Confirm
    else Error
        User->>System: Retry
    end`,
    
    classDiagram: `classDiagram
    class Animal {
        +String name
        +makeSound()
    }
    class Dog {
        +bark()
    }
    class Cat {
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
    
    note for Animal "Base class for all animals"`,
    
    stateDiagram: `stateDiagram-v2
    [*] --> Still
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
    
    state Moving {
        Slow --> Fast
        Fast --> Slow
    }`,
    
    erDiagram: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER {
        string name
        string email
    }
    ORDER {
        int orderNumber
        date orderDate
    }
    LINE-ITEM {
        string product
        int quantity
    }`,
    
    gantt: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    
    section Planning
    Requirements: 2024-01-01, 15d
    Design: 2024-01-16, 20d
    
    section Development
    Coding: 2024-02-05, 30d
    Testing: 2024-03-06, 20d
    
    section Deployment
    Release: 2024-03-26, 10d`,
    
    pie: `pie title Project Resource Distribution
    "Development" : 40
    "Testing" : 20
    "Documentation" : 15
    "Management" : 15
    "Infrastructure" : 10`,
    
    gitGraph: `gitGraph
    commit id: "initial"
    branch develop
    checkout develop
    commit id: "feature-1"
    branch feature/login
    checkout feature/login
    commit id: "login-1"
    commit id: "login-2"
    checkout develop
    merge feature/login
    checkout main
    merge develop tag: "v1.0.0"`
};

// Make templates and diagramTemplates available globally
window.templates = templates;
window.diagramTemplates = diagramTemplates;