# Generic Types

Generic types in Yuho enable parametric polymorphism, allowing you to write reusable, type-safe code that works with multiple types.

## Overview

Generics were introduced in **Yuho Version 2** to support:

- **Reusable data structures** that work with any type
- **Type-safe collections** without code duplication
- **Parametric functions** that operate on generic types
- **Better abstraction** for legal concepts

## Generic Structs

### Basic Generic Struct

Define a struct with type parameters using angle brackets:

```yh
struct Container<T> {
    T value,
    string label,
}

// Usage with different types
Container<int> intContainer := {
    value := 42,
    label := "Number",
};

Container<string> stringContainer := {
    value := "Hello",
    label := "Text",
};

Container<Person> personContainer := {
    value := johnDoe,
    label := "Defendant",
};
```

### Multiple Type Parameters

Structs can have multiple generic parameters:

```yh
struct Pair<T, U> {
    T first,
    U second,
}

// Different type combinations
Pair<string, int> nameAge := {
    first := "Alice",
    second := 30,
};

Pair<Person, Offense> caseRecord := {
    first := defendant,
    second := chargedOffense,
};

Pair<money<SGD>, date> payment := {
    first := $1000.00,
    second := 01-01-2024,
};
```

### Generic Collections

Common collection patterns with generics:

```yh
// List of any type
struct List<T> {
    Array<T> items,
    int size,
}

// Map-like structure
struct Mapping<K, V> {
    Array<K> keys,
    Array<V> values,
}

// Optional value
struct Optional<T> {
    bool hasValue,
    T value,
}

// Result type for error handling
struct Result<T, E> {
    bool isSuccess,
    T successValue,
    E errorValue,
}
```

## Generic Functions

### Basic Generic Function

Functions can also be generic:

```yh
func identity<T>(T value) -> T {
    := value
}

// Usage
int x := identity<int>(42);
string y := identity<string>("hello");
Person p := identity<Person>(defendant);
```

### Generic Function with Constraints

```yh
// Generic function operating on any pair
func swap<T, U>(Pair<T, U> pair) -> Pair<U, T> {
    := {
        first := pair.second,
        second := pair.first,
    }
}

// Usage
Pair<string, int> original := { first := "age", second := 25 };
Pair<int, string> swapped := swap<string, int>(original);
// swapped.first == 25, swapped.second == "age"
```

### Generic Array Operations

```yh
// Get first element of any array
func first<T>(Array<T> arr) -> T {
    := arr[0]
}

// Get length of any array
func length<T>(Array<T> arr) -> int {
    := arr.size
}

// Map function (if supported)
func map<T, U>(Array<T> arr, func<T, U> transformer) -> Array<U> {
    // Transform each element
    := transformed
}
```

## Legal Use Cases

### Generic Case Record

```yh
struct CaseRecord<T> {
    string caseNumber,
    date filingDate,
    T details,
    Array<string> parties,
}

// Different case types
CaseRecord<CriminalOffense> criminalCase := {
    caseNumber := "CR-2024-001",
    filingDate := 01-01-2024,
    details := cheatingOffense,
    parties := ["PP", "John Doe"],
};

CaseRecord<CivilClaim> civilCase := {
    caseNumber := "CV-2024-001",
    filingDate := 01-01-2024,
    details := contractBreach,
    parties := ["Alice Ltd", "Bob Corp"],
};
```

### Generic Legal Principle

```yh
struct LegalPrinciple<T> {
    string name,
    string jurisdiction,
    T applicableCondition,
    Array<string> precedents,
}

// Different condition types
LegalPrinciple<bool> simplicPrinciple := {
    name := "Presumption of Innocence",
    jurisdiction := "Singapore",
    applicableCondition := true,
    precedents := ["Public Prosecutor v XYZ [2020]"],
};

LegalPrinciple<Condition> complexPrinciple := {
    name := "Double Jeopardy",
    jurisdiction := "Singapore",
    applicableCondition := sameOffenseSamePerson,
    precedents := ["Case1", "Case2"],
};
```

### Generic Document

```yh
struct LegalDocument<T> {
    string title,
    date created,
    Array<string> signatories,
    T content,
}

// Contract document
LegalDocument<Contract> contractDoc := {
    title := "Employment Agreement",
    created := 01-01-2024,
    signatories := ["Employer", "Employee"],
    content := employmentContract,
};

// Court order document
LegalDocument<CourtOrder> orderDoc := {
    title := "Injunction Order",
    created := 15-01-2024,
    signatories := ["Judge"],
    content := injunctionDetails,
};
```

## Type Parameter Constraints

### Arity Checking

Yuho enforces correct number of type arguments:

```yh
struct Container<T> { T value }
struct Pair<T, U> { T first, U second }

// Correct
Container<int> c1;          // ✓ 1 parameter
Pair<string, int> p1;       // ✓ 2 parameters

// Errors
// Container<int, string> c2;  // ✗ Error: Container expects 1 parameter, got 2
// Pair<int> p2;               // ✗ Error: Pair expects 2 parameters, got 1
```

## Advanced Patterns

### Nested Generics

Generic types can be nested:

```yh
// Array of arrays
Array<Array<int>> matrix := [[1, 2], [3, 4]];

// Array of pairs
Array<Pair<string, int>> records := [
    { first := "Alice", second := 25 },
    { first := "Bob", second := 30 },
];

// Container of containers
Container<Container<string>> nested := {
    value := {
        value := "deep",
        label := "inner",
    },
    label := "outer",
};
```

### Generic with Dependent Types

Combine generics with dependent types for stronger guarantees:

```yh
struct BoundedContainer<T> {
    T value,
    BoundedInt<0, 100> capacity,
    Positive<int> currentSize,
}

struct ValidatedList<T> {
    NonEmpty<Array<T>> items,
    BoundedInt<1, 1000> maxSize,
}
```

## Best Practices

### 1. Use Descriptive Type Parameter Names

```yh
// Good: Clear what T represents
struct CourtCase<TOffense> {
    TOffense offense,
    string defendant,
}

// Acceptable: Single letter for simple cases
struct Box<T> {
    T value,
}
```

### 2. Keep Generics Simple

```yh
// Good: Simple, clear purpose
struct Pair<T, U> {
    T first,
    U second,
}

// Avoid: Overly complex generic hierarchies
// struct Complex<T, U, V, W, X> { ... }  // Too many parameters
```

### 3. Use Generics for Reusability

```yh
// Good: Reusable pattern
struct Evidence<T> {
    T item,
    date collected,
    string chain_of_custody,
}

// Avoid: Overly specific
struct StringEvidence { string item, ... }  // Not reusable
struct IntEvidence { int item, ... }        // Duplicated code
```

## Type Inference

In some contexts, Yuho can infer generic type arguments:

```yh
// Explicit type arguments
Container<int> c1 := createContainer<int>(42);

// Inferred from usage (if supported)
Container<int> c2 := createContainer(42);  // Infers T = int
```

## Limitations

Current limitations of generics in Yuho v2:

1. **No trait bounds**: Cannot constrain type parameters (e.g., "T must be Comparable")
2. **No default type parameters**: Cannot specify default types
3. **No variadic generics**: Cannot have variable number of type parameters
4. **No higher-kinded types**: Type parameters must be concrete types

## Examples

### Complete Legal Example

```yh
// Generic case management system
struct Case<TOffense, TEvidence> {
    string caseNumber,
    date filed,
    Person defendant,
    TOffense offense,
    Array<TEvidence> evidence,
    Array<string> witnesses,
}

// Specific case types
Case<Cheating, DocumentEvidence> fraudCase := {
    caseNumber := "2024-CR-001",
    filed := 01-01-2024,
    defendant := johnDoe,
    offense := cheatingCharge,
    evidence := [doc1, doc2, doc3],
    witnesses := ["Alice", "Bob"],
};

Case<Theft, PhysicalEvidence> theftCase := {
    caseNumber := "2024-CR-002",
    filed := 02-01-2024,
    defendant := janeDoe,
    offense := theftCharge,
    evidence := [item1, item2],
    witnesses := ["Charlie"],
};
```

## See Also

- [Type Aliases](type-aliases.md) - Semantic naming with generic type aliases
- [Types](types.md) - Complete type system reference
- [Structs](structs.md) - Struct definitions and usage
- [Functions](functions.md) - Function definitions
