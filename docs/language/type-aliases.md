# Type Aliases

Type aliases provide semantic naming for types, making code more readable and maintainable.

## Overview

Type aliases were introduced in **Yuho Version 2** to:

- **Improve readability** with domain-specific names
- **Simplify complex type signatures**
- **Document intent** through type names
- **Enable refactoring** by centralizing type definitions

## Basic Type Aliases

### Simple Aliases

Use the `:=` operator to create type aliases:

```yh
// Primitive type aliases
type UserId := int
type EmailAddress := string
type Temperature := float
type IsActive := bool

// Usage
UserId currentUser := 12345;
EmailAddress contact := "user@example.com";
Temperature bodyTemp := 36.5;
IsActive status := true;
```

### Money Type Aliases

```yh
type SGDAmount := money<SGD>
type USDAmount := money<USD>
type Fine := money<SGD>
type Compensation := money<SGD>

// Usage
SGDAmount salary := $5000.00;
Fine trafficFine := $200.00;
Compensation damages := $10000.00;
```

### Bounded Type Aliases

```yh
type Age := BoundedInt<0, 150>
type Percentage := BoundedInt<0, 100>
type Grade := BoundedInt<0, 100>
type Month := BoundedInt<1, 12>
type Day := BoundedInt<1, 31>

// Usage
Age personAge := 25;
Percentage successRate := 95;
Grade examScore := 87;
```

## Generic Type Aliases

Type aliases can also be generic:

```yh
// Generic container alias
type Box<T> := Container<T>

// Generic pair alias
type KeyValue<K, V> := Pair<K, V>

// Generic list alias
type StringList := Array<string>
type IntList := Array<int>
type PersonList := Array<Person>

// Usage
Box<int> numberBox := container;
KeyValue<string, int> mapping := pair;
StringList names := ["Alice", "Bob", "Charlie"];
```

### Partially Applied Generic Aliases

```yh
// Fix one type parameter
type IntPair<T> := Pair<int, T>
type StringMap<V> := Mapping<string, V>

// Usage
IntPair<string> idToName := { first := 1, second := "Alice" };
StringMap<int> wordCount := { keys := ["hello"], values := [5] };
```

## Legal Domain Aliases

### Singapore Legal Types

```yh
// Penal Code types
type Section := string
type Subsection := string
type PenalCodeCitation := Citation<Section, Subsection, "Penal Code">

// Court types
type CaseNumber := string
type CourtDate := date
type SingaporeCourt := string  // "SGCA", "SGHC", "SGDC", "SGMC"

// Money types
type SingaporeFine := money<SGD>
type SingaporeBond := money<SGD>

// Usage
PenalCodeCitation cheating := Citation<"415", "1", "Penal Code">;
SingaporeFine penalty := $5000.00;
CaseNumber case := "2024-CR-001";
```

### Common Legal Aliases

```yh
// Temporal types
type LawEffectiveDate := Temporal<string, valid_from>
type TemporaryProvision := Temporal<bool, valid_from, valid_until>

// Person types
type DefendantName := NonEmpty<string>
type WitnessList := NonEmpty<Array<string>>
type JudgeName := NonEmpty<string>

// Constraint types
type PositiveAmount := Positive<money<SGD>>
type NonZeroInterestRate := Positive<float>
type ValidAge := BoundedInt<0, 150>

// Usage
DefendantName accused := "John Doe";
WitnessList witnesses := ["Alice", "Bob"];
PositiveAmount compensation := $1000.00;
```

## Complex Type Aliases

### Nested Generics

```yh
// Array of pairs
type PairList<T, U> := Array<Pair<T, U>>

// Nested containers
type BoxList<T> := Array<Box<T>>
type NestedBox<T> := Box<Box<T>>

// Usage
PairList<string, int> records := [
    { first := "age", second := 25 },
    { first := "score", second := 95 },
];

BoxList<string> boxes := [box1, box2, box3];
```

### Function Type Aliases

```yh
// Predicate functions
type IntPredicate := func(int) -> bool
type StringValidator := func(string) -> bool

// Transformer functions
type IntTransformer := func(int) -> int
type StringMapper := func(string) -> string

// Usage (if function types are fully supported)
IntPredicate isPositive := func(int x) { := x > 0 };
StringValidator isValidEmail := func(string email) { := /* validation */ };
```

## Best Practices

### 1. Use Semantic Names

```yh
// Good: Clear domain meaning
type ContractValue := money<SGD>
type LegalAge := BoundedInt<18, 150>
type CourtDate := date

// Avoid: Cryptic abbreviations
type CV := money<SGD>         // Unclear
type LA := BoundedInt<18, 150>  // What does LA mean?
```

### 2. Group Related Aliases

```yh
// Person-related types
type PersonId := int
type PersonName := NonEmpty<string>
type PersonAge := BoundedInt<0, 150>

// Case-related types
type CaseId := string
type CaseNumber := string
type CaseDate := date

// Financial types
type Amount := money<SGD>
type Fine := Positive<money<SGD>>
type Interest := BoundedInt<0, 100>
```

### 3. Document Complex Aliases

```yh
// Represents a validated Singapore NRIC number
type NRIC := NonEmpty<string>

// Represents court filing fees in Singapore dollars
// Must be positive and less than $100,000
type FilingFee := BoundedInt<0, 100000>

// Represents a legal entity's registration date
// Must be after Singapore's independence (09-08-1965)
type RegistrationDate := ValidDate<after="09-08-1965">
```

## Type Alias Resolution

### Transitivity

Type aliases are resolved transitively:

```yh
type A := int
type B := A
type C := B

// C resolves to int
C value := 42;  // Valid
```

### With Generics

```yh
type StringBox := Box<string>
type NameBox := StringBox

// NameBox resolves to Box<string>
NameBox nameContainer := { value := "Alice", label := "Name" };
```

## Complete Example

### Contract Management System

```yh
// Basic types
type ContractId := NonEmpty<string>
type PartyName := NonEmpty<string>
type ContractValue := Positive<money<SGD>>
type SignDate := date
type ExpiryDate := ValidDate<after="01-01-2024">

// Complex types
type Party := Person
type PartyList := NonEmpty<Array<Party>>
type TermsList := NonEmpty<Array<string>>

// Contract type
type Contract := struct {
    ContractId id,
    PartyName firstParty,
    PartyName secondParty,
    ContractValue value,
    SignDate signed,
    ExpiryDate expiry,
    TermsList terms,
}

// Usage
Contract employmentContract := {
    id := "EMP-2024-001",
    firstParty := "ABC Corp",
    secondParty := "John Doe",
    value := $100000.00,
    signed := 01-01-2024,
    expiry := 31-12-2024,
    terms := ["Term 1", "Term 2", "Term 3"],
};
```

### Court Case System

```yh
// Case identifiers
type CaseNumber := NonEmpty<string>
type DocketNumber := NonEmpty<string>

// Parties
type Prosecutor := NonEmpty<string>
type Defendant := NonEmpty<string>
type DefendantList := NonEmpty<Array<Defendant>>

// Dates
type FilingDate := date
type HearingDate := ValidDate<after="01-01-2020">
type JudgmentDate := date

// Amounts
type Fine := Positive<money<SGD>>
type Compensation := Positive<money<SGD>>
type BailAmount := money<SGD>

// Case structure
type CriminalCase := struct {
    CaseNumber caseNum,
    DocketNumber docket,
    Prosecutor prosecution,
    DefendantList defendants,
    FilingDate filed,
    HearingDate hearing,
    Fine penalty,
}

// Usage
CriminalCase case2024 := {
    caseNum := "2024-CR-001",
    docket := "D-2024-001",
    prosecution := "Public Prosecutor",
    defendants := ["John Doe", "Jane Smith"],
    filed := 01-01-2024,
    hearing := 15-02-2024,
    penalty := $5000.00,
};
```

## Advantages

### 1. Improved Readability

```yh
// Without aliases
func calculateFine(BoundedInt<0, 100000> amount) -> money<SGD> { ... }

// With aliases
type FineAmount := BoundedInt<0, 100000>
type SGDAmount := money<SGD>
func calculateFine(FineAmount amount) -> SGDAmount { ... }
```

### 2. Centralized Changes

```yh
// Change the underlying type in one place
type UserId := int  // Change to: type UserId := string

// All usages automatically update
func getUser(UserId id) -> User { ... }
func deleteUser(UserId id) { ... }
```

### 3. Self-Documenting Code

```yh
// Clear intent
type VotingAge := BoundedInt<18, 120>
type MinorAge := BoundedInt<0, 17>

func canVote(VotingAge age) -> bool {
    := true  // Type system enforces age >= 18
}
```

## Limitations

Current limitations in Yuho v2:

1. **No conditional types**: Cannot have types that depend on values
2. **No type-level computation**: Cannot compute new types from existing ones
3. **No recursive type aliases**: Cannot define self-referential type aliases

## See Also

- [Generics](generics.md) - Generic type parameters
- [Types](types.md) - Complete type system reference
- [Structs](structs.md) - Struct definitions
- [Functions](functions.md) - Function signatures with type aliases
