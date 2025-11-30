# Type System

Yuho's type system provides strong, static typing designed for legal reasoning.

## Overview

Yuho features a comprehensive type system that ensures:

- **Type Safety** - All types are known at compile time
- **Immutability** - All values are immutable by default
- **Legal Relevance** - Types designed for legal concepts
- **No Type Coercion** - Strict type checking prevents errors

## Primitive Types

### Numeric Types

#### Integer (`int`)
Whole numbers of any precision:

```yh
int age := 25;
int count := 1000;
int negative := -42;
```

#### Float (`float`)
Floating-point numbers:

```yh
float percentage := 0.25;
float precise := 3.14159;
float negative := -2.5;
```

#### Percent (`percent`)
Percentage values with `%` suffix:

```yh
percent taxRate := 25%;  // Evaluates to 0.25
percent discount := 10%; // Evaluates to 0.10
percent penalty := 100%; // Evaluates to 1.00
```

#### Money (`money`)
Currency values with currency-specific types:

```yh
// Basic money type
money fine := $500.00;
money salary := $50,000.00;

// Currency-specific money types (NEW in v2)
money<SGD> singaporeFine := $500.00;
money<USD> americanFine := $500.00;
money<EUR> europeanFine := $500.00;
money<GBP> britishFine := $500.00;

// Prevents mixing currencies
// money<SGD> total := singaporeFine + americanFine;  // Error: currency mismatch
```

### Text Types

#### String (`string`)
Text enclosed in double quotes:

```yh
string name := "John Doe";
string offense := "theft";
string description := "A person commits theft when...";
```

### Boolean (`bool`)
Logical values:

```yh
bool isGuilty := TRUE;
bool isMinor := FALSE;
bool hasPermission := TRUE;
```

### Temporal Types

#### Date (`date`)
Dates in DD-MM-YYYY format:

```yh
date birthDate := 15-03-1990;
date offenseDate := 01-01-2024;
date courtDate := 15-12-2024;
```

#### Duration (`duration`)
Time periods with day/month/year suffixes:

```yh
duration sentence := 5 years;
duration probation := 2 years 6 months;
duration remand := 30 days;
```

## Dependent Types (Version 2)

Dependent types allow you to specify constraints and refinements on types for stronger guarantees.

### BoundedInt<min, max>

Integer types with compile-time range constraints:

```yh
// Age must be between 0 and 150
BoundedInt<0, 150> age := 25;

// Percentage must be between 0 and 100
BoundedInt<0, 100> percentage := 75;

// Legal voting age
BoundedInt<18, 120> voterAge := 21;

// This would cause a compile error:
// BoundedInt<0, 100> invalid := 150;  // Error: value out of range
```

### Positive<T>

Ensures numeric values are always positive:

```yh
// Positive integers only
Positive<int> count := 10;
Positive<int> population := 5000000;

// Positive floats only
Positive<float> rate := 3.5;
Positive<float> percentage := 0.25;

// This would cause an error:
// Positive<int> invalid := -5;  // Error: value must be positive
```

### NonEmpty<T>

Ensures collections or strings are never empty:

```yh
// Non-empty string
NonEmpty<string> name := "John Doe";
NonEmpty<string> title := "Contract";

// Non-empty array
NonEmpty<Array<string>> witnesses := ["Alice", "Bob"];
NonEmpty<Array<int>> scores := [85, 90, 95];

// This would cause an error:
// NonEmpty<string> invalid := "";  // Error: value cannot be empty
```

### Array<T>

Generic array types for collections:

```yh
// Array of strings
Array<string> names := ["Alice", "Bob", "Charlie"];

// Array of integers
Array<int> ages := [25, 30, 35];

// Array of custom types
Array<Person> defendants := [person1, person2];

// Nested arrays
Array<Array<int>> matrix := [[1, 2], [3, 4]];
```

### ValidDate

Date types with optional before/after constraints:

```yh
// Date with minimum constraint
ValidDate<after="01-01-2020"> recentDate := 15-06-2024;

// Date with maximum constraint
ValidDate<before="31-12-2025"> futureDate := 01-12-2024;

// Date with both constraints
ValidDate<after="01-01-2020", before="31-12-2025"> boundedDate := 15-06-2024;

// This would cause an error:
// ValidDate<after="01-01-2020"> invalid := 15-12-2019;  // Error: date too early
```

### Temporal<T, valid_from, valid_until>

Time-bound values that are only valid within specific date ranges:

```yh
// Law valid from a specific date
Temporal<string, valid_from="01-01-2020"> newLaw := "Updated regulation text";

// Temporary provision with expiry
Temporal<bool, valid_from="01-01-2020", valid_until="31-12-2025"> temporaryRule := true;

// Contract validity period
Temporal<Contract, valid_from="01-01-2024", valid_until="31-12-2024"> yearlyContract := contractData;
```

### Citation<section, subsection, act>

Structured legal citation types:

```yh
// Singapore Penal Code citation
Citation<"415", "1", "Penal Code"> cheatingProvision;

// Companies Act citation
Citation<"157", "", "Companies Act"> directorsduty;

// Multi-subsection citation
Citation<"300", "a", "Penal Code"> murderProvision;

// Verifies citation exists and format is correct
```

### Where Clauses

Add field-level constraints to any type:

```yh
struct Contract {
    // Money constraint
    money<SGD> amount where amount > 0 && amount <= 1000000,

    // Integer constraint
    BoundedInt<1, 10> parties where parties >= 2,

    // Date constraint
    date signed_date where signed_date > "01-01-2020",

    // String constraint
    string status where status in ["active", "pending", "completed"],

    // Positive constraint
    Positive<float> interest_rate where interest_rate < 0.15,
}
```

## Custom Types

### Struct Types

Define custom types using structs:

```yh
struct Person {
    string name,
    int age,
    bool isMinor
}

struct Offense {
    string name,
    money penalty,
    int maxSentence
}
```

### Using Custom Types

```yh
Person defendant := {
    name := "Alice",
    age := 25,
    isMinor := FALSE
};

Offense theft := {
    name := "theft",
    penalty := $1000.00,
    maxSentence := 7
};
```

## Union Types

Use `||` to specify multiple possible types:

```yh
// Variable that could be money or pass (null)
pass || money optionalFine := pass;

// Variable that could be string or int
string || int flexibleValue := "hello";

// Complex union type
Person || Offense || pass complexValue := pass;
```

### Union Type Examples

```yh
// Optional penalty
pass || money penalty := pass;

// Later assignment
penalty := $500.00;

// Check if value exists
match penalty {
    case pass := consequence "no penalty";
    case _ := consequence "penalty applied";
}
```

## Type Annotations

### Variable Declarations

```yh
// Explicit type annotation
int age := 25;
string name := "John";
bool isGuilty := TRUE;

// Type inference (when possible)
age := 25;        // Inferred as int
name := "John";   // Inferred as string
isGuilty := TRUE; // Inferred as bool
```

### Function Parameters

```yh
bool func checkAge(int age) {
    match age {
        case 18 := consequence TRUE;
        case _ := consequence FALSE;
    }
}

string func formatName(string firstName, string lastName) {
    := firstName + " " + lastName
}
```

### Return Types

```yh
// Simple return type
int func add(int a, int b) {
    := a + b
}

// Complex return type
Person func createPerson(string name, int age) {
    := {
        name := name,
        age := age,
        isMinor := age < 18
    }
}
```

## Type Checking

### Compile-Time Checking

Yuho performs type checking at compile time:

```yh
int x := 42;
string y := "hello";

// This would cause a type error
// int z := x + y;  // Error: cannot add int and string
```

### Type Compatibility

```yh
// Compatible types
int a := 10;
int b := 20;
int sum := a + b;  // OK: both are int

// Incompatible types
int x := 10;
string y := "hello";
// int z := x + y;  // Error: type mismatch
```

## Type Conversions

### Explicit Conversions

```yh
// Convert int to float
int wholeNumber := 42;
float decimalNumber := float(wholeNumber);

// Convert float to int (truncates)
float precise := 3.14159;
int rounded := int(precise);  // Results in 3
```

### Implicit Conversions

```yh
// Percent to float
percent rate := 25%;
float decimalRate := rate;  // Automatically converts to 0.25

// Money to float
money amount := $100.00;
float value := amount;  // Automatically converts to 100.0
```

## Type Safety Features

### No Type Coercion

Yuho prevents automatic type conversions:

```yh
int x := 42;
string y := "42";

// These are different types
// bool same := x == y;  // Error: cannot compare int and string
```

### Null Safety

Use `pass` for nullable types:

```yh
// Nullable money type
pass || money optionalFine := pass;

// Check for null
match optionalFine {
    case pass := consequence "no fine";
    case _ := consequence "fine applied";
}
```

## Legal-Specific Types

### Money Type

The `money` type is designed for legal contexts:

```yh
money fine := $500.00;
money compensation := $10,000.00;
money damages := $1,000,000.00;

// Money arithmetic
money total := fine + compensation;
money discounted := total * 0.9;  // 10% discount
```

### Date Type

The `date` type handles legal dates:

```yh
date offenseDate := 01-01-2024;
date courtDate := 15-12-2024;
date birthDate := 15-03-1990;

// Date arithmetic
duration age := courtDate - birthDate;
duration timeSinceOffense := courtDate - offenseDate;
```

### Duration Type

The `duration` type represents legal time periods:

```yh
duration sentence := 5 years;
duration probation := 2 years 6 months;
duration remand := 30 days;

// Duration arithmetic
duration totalTime := sentence + probation;
```

## Type Patterns

### Pattern 1: Legal Entity

```yh
struct LegalEntity {
    string name,
    string type,  // "person", "corporation", "government"
    bool isMinor,
    date dateOfBirth
}
```

### Pattern 2: Offense Definition

```yh
struct Offense {
    string name,
    string section,
    money maxFine,
    int maxSentence,
    bool isIndictable
}
```

### Pattern 3: Case Facts

```yh
struct CaseFacts {
    string caseNumber,
    date offenseDate,
    string location,
    bool isGuilty,
    money penalty
}
```

## Type Validation

### Compile-Time Validation

```yh
// Valid types
int age := 25;
string name := "John";
bool isGuilty := TRUE;

// Invalid types (would cause errors)
// int invalid := "hello";  // Error: string cannot be int
// bool invalid := 42;      // Error: int cannot be bool
```

### Runtime Type Checking

```yh
// Use match-case for type checking
match value {
    case int _ := consequence "it's an integer";
    case string _ := consequence "it's a string";
    case bool _ := consequence "it's a boolean";
    case _ := consequence "unknown type";
}
```

## Best Practices

### 1. Use Appropriate Types

```yh
// Good: Use money for currency
money fine := $500.00;

// Avoid: Use float for currency
float fine := 500.00;  // Less clear, no currency context
```

### 2. Use Union Types for Optional Values

```yh
// Good: Optional fine
pass || money optionalFine := pass;

// Avoid: Always required
money fine := $0.00;  // Unclear if 0 means "no fine" or "fine is 0"
```

### 3. Use Descriptive Type Names

```yh
// Good: Clear legal context
struct CriminalOffense {
    string name,
    money penalty,
    int maxSentence
}

// Avoid: Generic names
struct Thing {
    string a,
    money b,
    int c
}
```

### 4. Use Type Annotations for Clarity

```yh
// Good: Clear return type
bool func isGuilty(Offense offense) {
    // function body
}

// Avoid: Unclear return type
func check(Offense offense) {
    // function body
}
```

## Common Type Errors

### Error 1: Type Mismatch

```yh
int x := 42;
string y := "hello";
// int z := x + y;  // Error: cannot add int and string
```

**Solution**: Use explicit conversion or match types:

```yh
int x := 42;
string y := "hello";
string z := string(x) + y;  // Convert int to string first
```

### Error 2: Null Access

```yh
pass || money optionalFine := pass;
// money amount := optionalFine;  // Error: optionalFine might be pass
```

**Solution**: Use match-case to handle null:

```yh
pass || money optionalFine := pass;
match optionalFine {
    case pass := consequence "no fine";
    case _ := consequence "fine exists";
}
```

### Error 3: Type Inference Failure

```yh
// This might not infer the correct type
value := 42;  // Could be int or float
```

**Solution**: Use explicit type annotation:

```yh
int value := 42;  // Explicitly int
float value := 42.0;  // Explicitly float
```

## Type System Benefits

### 1. Compile-Time Safety

- Catches type errors before runtime
- Prevents common programming mistakes
- Ensures type consistency

### 2. Legal Context

- Types designed for legal concepts
- Money type for currency
- Date type for legal dates
- Duration type for sentences

### 3. Immutability

- All values are immutable
- Prevents accidental modifications
- Ensures data integrity

### 4. Pattern Matching

- Type-safe pattern matching
- Exhaustive case coverage
- Clear error handling

## Next Steps

- [Syntax Reference](syntax.md) - Complete syntax guide
- [Structs](structs.md) - Working with data structures
- [Match-Case](match-case.md) - Pattern matching patterns
- [Functions](functions.md) - Function definitions and usage
