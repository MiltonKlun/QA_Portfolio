# Using GSD (Get Shit Done) for Your Next Project

This brief outlines how to leverage the **GSD methodology**—a spec-driven, context-engineered workflow—to ensure high-quality, autonomous development for our next project.

## 🚀 What is it?
GSD is a system designed to make AI coding reliable by enforcing strict **context engineering** and **methodical planning**. Instead of "vibecoding" (randomly asking for features), we follow a structured lifecycle: **Spec → Plan → Execute → Verify**.

## 🛠️ Getting Started (The Setup)
For our new project, we will initialize the environment to enforce these rules from day one.

1.  **Initialize**: Run `/new-project`.
    *   This triggers a deep interview process to define `SPEC.md` (The "Bible" of the project).
    *   It creates the `.gsd` structure and vital artifacts (`ROADMAP.md`, `Architecture.md`).

## 🔄 The Core Workflow
Once setup, we follow a strict loop for every feature or phase.

### Phase 1: Planning (The Lock) 🔒
*   **Rule**: No code is written until `SPEC.md` is finalized.
*   **Action**: Run `/plan [PhaseNumber]`.
*   **Result**: Generates a `PLAN.md` with XML-structured atomic tasks.
*   **Why**: Defines *exactly* what to do before doing it, minimizing hallucinations.

### Phase 2: Execution (The Wave) 🌊
*   **Action**: Run `/execute [PhaseNumber]`.
*   **Behavior**:
    *   Reads the `PLAN.md`.
    *   Executes tasks in "waves" (updates files, runs commands).
    *   **Atomic Commits**: Automatically commits after *each* task (e.g., `feat(phase-1): implement login`).

### Phase 3: Verification (The Proof) ✅
*   **Rule**: "Trust, but verify." No task is done without proof.
*   **Action**: Run `/verify [PhaseNumber]`.
*   **Requirement**: Must produce empirical evidence (curl output, screenshots, test results).

## 📂 The Sacred Files
These files in `.gsd/` are critical and should be treated with care:

*   **`SPEC.md`**: The absolute truth. If it's not here, it doesn't exist.
*   **`PLAN.md`**: The executable map. XML tasks that drive the agent.
*   **`STATE.md`**: The project's memory. Persists context across sessions to prevent "amnesia."
*   **`ROADMAP.md`**: High-level progress tracking.

## 🛑 Golden Rules
1.  **Plan Before Code**: Never start coding without a finalized Spec and Plan.
2.  **State is Sacred**: Always update `STATE.md` before ending a session (`/pause`).
3.  **Context Hygiene**: If stuck (3 failures), dump state and restart (`/pause` then `/resume`).

## Has the user "installed" the workflows?
The system detects the workflows in `.agent/workflows`. You can trigger them using the slash commands (e.g., `/plan`, `/map`) directly in the chat.

## Next Steps for Us
1.  **Define Idea**: Have a clear goal for the new project.
2.  **Run `/new-project`**: I will walk you through defining the spec.
3.  **Approve Spec**: Review and finalize the `SPEC.md`.
4.  **Start Phase 1**: I will `/plan 1` and then `/execute 1`.
