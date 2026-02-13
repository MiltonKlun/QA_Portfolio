# 🚀 GSD for Antigravity: Cheatsheet

Save this file as `GSD_CHEATSHEET.md` in your project root to keep your agent focused.

## 1. Project Setup
*Use these only once when starting a new repository or a massive feature.*

| Command | Action | When to use |
| :--- | :--- | :--- |
| **`/new-project`** | Starts the interview to define `SPEC.md`. | When creating an empty repo. The agent will interview you about goals, stack, and constraints. |
| **`/scaffold`** | Creates the base folder structure (`.gsd/`, etc). | If you manually wrote the `SPEC.md` and just want to prepare the environment. |

---

## 2. The Work Loop
*This is your daily workflow. Follow the order strictly.*

### Phase A: Planning
| Command | Action | Description |
| :--- | :--- | :--- |
| **`/plan`** | Generates/Updates `PLAN.md`. | Reads `SPEC.md` and creates a task list in **XML**. Breaks work into atomic steps. |
| **`/review`** | Reviews the current plan. | Use before coding to ensure Gemini understands dependency logic. |

### Phase B: Execution (Coding)
| Command | Action | Description |
| :--- | :--- | :--- |
| **`/execute`** | Executes the next task in `PLAN.md`. | The agent reads **only** necessary context, writes code, and updates `STATE.md`. |
| **`/test`** or **`/verify`** | Runs tests for the current task. | **Mandatory.** Forces the agent to run code (curl, unit test, script) and validate output. |
| **`/fix`** | Debug mode. | If `/verify` fails, use this. The agent reads the error and proposes a fix without switching tasks. |

### Phase C: Finalization
| Command | Action | Description |
| :--- | :--- | :--- |
| **`/commit`** | Generates a semantic git commit. | Only do this when `/verify` passes successfully. |
| **`/next`** | Marks task as `[X]` and moves to the next. | Updates `PLAN.md` and clears context for the new task. |

---

## 3. Context Management & Maintenance
*Use these when the agent gets lost or requirements change.*

| Command | Action | When to use |
| :--- | :--- | :--- |
| **`/update-spec`** | Modifies `SPEC.md`. | When you or the stakeholder changes a functional requirement mid-project. |
| **`/refresh`** | Reloads context. | If Gemini starts hallucinating old files. Forces a re-read of `.gsd/STATE.md`. |
| **`/log`** | Adds a note to `SCRATCHPAD.md`. | To save quick ideas or minor "todos" without breaking the main plan flow. |

---

## 4. The Sacred Files (`.gsd/` Directory)
*Never let the agent modify these files without explicit supervision.*

* 📄 **`SPEC.md`**: **The Bible.** The absolute truth of *what* we are building. If it's not here, it doesn't exist.
* 🗺️ **`PLAN.md`**: **The Map.** Task list in XML (`<task>`). Defines execution order.
* 🚦 **`STATE.md`**: **The Memory.** What was done, what is missing, and lessons learned from previous errors.
* 🧠 **`CONTEXT.md`** (Optional): Extra technical context (e.g., external API docs, DB schema).

---

## 💡 Pro-Tips for QA/Backend Workflows

1.  **TDD Approach:** In your `SPEC.md`, add an explicit rule: *"Every task in the PLAN must include the creation of a unit test (pytest/unittest) before implementation."* This aligns perfectly with QA best practices.
2.  **API Validation:** Since you might use `Stagehand` or interact with APIs, modify the `/verify` workflow to include `curl -v` or Playwright scripts that validate a 200 OK response.
3.  **Preventing Drift:** If Gemini suggests unprompted architecture changes, use `/refuse` (or just say "Stop") and run `/refresh` to force it back to the `SPEC.md` definitions.