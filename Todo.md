# 🎯 Milestones 4 & 5 Todo List

## 📋 Quick Implementation Checklist

### Phase 1: Customization Foundation 🔧
- [ ] Design user settings database schema
      Fields:
          - debtEnabled
          - debtMax (default or custom value)
          - interestEnabled
          - interestPercent (Default or custom value, float)
          - displayBankruptcy
          - deleteChoresOnCompletion (Plan for override later)
          - DeleteShopItemsOnCompletion (Plan for override later)
          - levelingEnabled
          - levelDecayEnabled
          - levelDecayPerDay
          - currencyName (Ex: time tokens, minutes, credits, tokens, coins, etc)
          - bankruptcyEnabled
          - bankruptcyCooldownDays
          - probationEnabled
          - probationDurationDays
          - confirmBeforePurchase
          - confirmBeforeDebt
          - showCompletionAnimations (Might add animations later)
          - streakNotifications
          - weeklyReports
          - defaultChoreReward
          - defaultShopItemCost
          - streakBonusMultiplierEnabled
          - achievementEnabled
          - leaderboardEnabled
          - analyticsEnabled
          - theme ("light", "dark", "auto" - based on time)
          - familyEnabled
          
- [ ] Create settings API routes (GET/POST)
- [ ] Build settings UI framework
- [ ] Implement default values system

### Phase 2: Basic Leveling System 📈
- [ ] Add login tracking to backend
- [ ] Implement level calculation logic
- [ ] Create level display UI
- [ ] Connect level to overdraft limits

### Phase 3: Debt & Overdraft System 💳
- [ ] Modify balance validation for negative amounts
- [ ] Add overdraft limit enforcement
- [ ] Create red balance UI indicators
- [ ] Build debt warning modals

### Phase 4: Interest & Penalties ⚠️
- [ ] Build 5% weekly interest system
- [ ] Create bankruptcy functionality
- [ ] Implement probationary periods
- [ ] Add penalty tracking

### Phase 5: Integration & Polish ✨
- [ ] Connect settings to all features
- [ ] Build comprehensive settings UI
- [ ] Test all feature combinations
- [ ] Polish user experience

---

# 📝 Detailed Planning Documentation

**Planning Session Date:** August 14, 2025  
**Goal:** Implement Debt & Penalties (Milestone 4) + Gamification (Milestone 5)

## 📋 Planning Questions & Decisions

### Priority & Scope
**Question:** Between Milestone 4 (Debt & Penalties) and Milestone 5 (Gamification), which feels more important to implement first?

**Michael's Answer:** Focus on Milestone 4 first - specifically allowing negative balance and overdraft system. These debt mechanics will be most fun to implement. Then move to gamification features.

**Priority Order:**
1. Debt & Penalties (Milestone 4) - negative balance + overdraft system
2. Gamification (Milestone 5)

---

### Current System Analysis
**Question:** What happens when a user tries to spend more time than they have?

**Current Behavior:** App currently prevents overspending (good foundation to modify)

---

## 🎯 Milestone 4: Debt & Penalties Features
- [ ] Allow negative balance (with limit)
- [ ] Set overdraft limit per user
- [ ] Overdraft penalty system
- [ ] Visual warnings when in debt

## 🎮 Milestone 5: Gamification Features
- [ ] Streaks and bonus rewards
- [ ] Badges / levels
- [ ] Time multipliers for streaks
- [ ] Fun avatars or themes purchasable with time

### Overdraft & Penalty Design
**Question:** How much overdraft should users be allowed and what kind of penalties?

**Michael's Answer:** 
- **Fixed overdraft allowance** that increases with user level (ties into Milestone 5)
- **Small interest charges** on negative balances
- **Bankruptcy option** - allows user to reset balance to zero
- **UI Design:** Red balance display, obvious modal warnings, always show overdraft limit

---

### User Experience Design
**Question:** How obvious should debt warnings be?

**Michael's Answer:** Make it very obvious - red balance, modal warnings, overdraft limit always visible

---

## 📝 Implementation Notes

### Key Design Decisions
- Overdraft system ties into gamification level system
- Need cohesive penalty/bankruptcy mechanics
- Focus on obvious, clear UX for debt state

### Questions to Resolve
- Interest calculation frequency and rate
- Bankruptcy mechanics and potential penalties
- Integration with level system from Milestone 5

### Interest & Customization Design
**Question:** Interest mechanics and customization scope?

**Michael's Answer:**
- **5% per week** interest rate
- **HIGHLY customizable app** - users can disable features, adjust numbers
- **Customization complexity:** Significantly increases difficulty but adds major value

### Bankruptcy Penalties
**Question:** What penalties for bankruptcy?

**Michael's Ideas:**
- Level reduction penalty (but might not be "fun")
- "Probationary period" - temporarily can't go into debt
- Bankruptcy history visible on profile (like negative marks)
- All penalties should be **customizable/disableable**

### Leveling System Design Challenge
**Question:** How to design leveling when costs/rewards are adjustable?

**Michael's Dilemma:**
- Custom XP values per item vs time-token based vs login streaks
- Balance challenge: if rewards are adjustable, how to balance XP?
- **Potential solution:** Days logged in consecutively
  - +1-2 levels per day logged in
  - -1 level for missing a day
- **Implementation order:** Level system first, then negative balance, etc.

## 🔧 Technical Considerations

### Database Changes Needed
- Overdraft limit field per user
- Interest tracking
- Level system integration
- Bankruptcy history tracking(?)

## 📅 Development Plan (Loose Implementation Guide)

### Phase 1: Customization Foundation 🔧
**Goal:** Build the settings infrastructure to support all future customization

**Key Components:**
- User settings/preferences system
- Settings UI framework
- Database schema for customizable values
- Default value system

**Implementation Areas:**
- Backend: Settings model, API routes for getting/updating preferences
- Frontend: Settings page/modal, preference context
- Database: UserSettings table or embedded settings in User model

---

### Phase 2: Basic Leveling System 📈
**Goal:** Simple level system that other features can build on

**Key Components:**
- Level calculation logic (login streak based)
- Level display in UI
- Level-dependent calculations (overdraft limits)

**Implementation Areas:**
- Backend: Level calculation, login tracking, level-based overdraft logic
- Frontend: Level display, streak visualization
- Database: Login history, current level tracking

---

### Phase 3: Debt & Overdraft System 💳
**Goal:** Allow negative balances with smart limits and warnings

**Key Components:**
- Negative balance logic
- Overdraft limit enforcement
- Visual debt indicators
- Purchase flow modifications

**Implementation Areas:**
- Backend: Modified balance validation, overdraft limit calculations
- Frontend: Red balance display, debt warnings, overdraft info display
- Database: Overdraft history tracking

---

### Phase 4: Interest & Penalties ⚠️
**Goal:** Add consequences and recovery mechanics for debt

**Key Components:**
- Interest accrual system
- Bankruptcy functionality
- Probationary period logic
- Penalty tracking/history

**Implementation Areas:**
- Backend: Interest calculation job, bankruptcy process, penalty enforcement
- Frontend: Interest notifications, bankruptcy modal, penalty history display
- Database: Interest history, bankruptcy records, penalty tracking

---

### Phase 5: Integration & Polish ✨
**Goal:** Connect all systems and add customization controls

**Key Components:**
- Settings for all debt/level features
- Advanced leveling mechanics
- comprehensive testing
- UX refinements

**Implementation Areas:**
- All systems: Connect customization settings to actual functionality
- Frontend: Comprehensive settings UI, help/explanations
- Testing: Edge cases, setting combinations, user flows

---

## 🎯 Technical Architecture Notes

### Customization Layer Strategy
- **Settings as Source of Truth:** All numeric values (interest rates, overdraft multipliers, level requirements) should come from user settings
- **Sensible Defaults:** Ship with good default values, but allow override
- **Validation Layer:** Ensure user customizations don't break the app logic

### Database Considerations
- User settings: JSON field vs separate settings table
- Level tracking: Current level + login history vs calculated on-demand
- Interest tracking: When to calculate vs store historical values

### Frontend State Management
- Settings context for customization values
- Level/debt status in user context
- Real-time updates for balance changes

---

## 🤔 Open Questions for Implementation
1. **Login Streak Details:** Decay rate, level caps, streak bonus mechanics
2. **Interest Storage:** Real-time calculation vs stored interest debt
3. **Bankruptcy Limits:** Frequency restrictions, progressive penalties
4. **Settings Validation:** Min/max bounds for customizable values
5. **Migration Strategy:** How to handle users when adding new customizable features