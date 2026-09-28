# 📚 Sathtern Tasks — Full Stack Projects

Deux projets Full Stack complets développés dans le cadre des tâches **Sathtern**.

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular)
![.NET](https://img.shields.io/badge/.NET-9-512BD4?style=for-the-badge&logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-316192?style=for-the-badge&logo=postgresql)

---

## 📋 Tâches complétées

| # | Projet | Statut |
|---|--------|--------|
| 1 | **ToDoList Application** | ✅ Terminé |
| 2 | **Student Management System** | ✅ Terminé |

---

## 🎯 Task 1 — ToDoList Application

Application de gestion de tâches avec authentification JWT.

### 🛠️ Stack
- **Backend** : ASP.NET Core 9 + EF Core + PostgreSQL
- **Frontend** : Angular 19 + Bootstrap 5
- **Auth** : JWT + BCrypt

### ✅ Fonctionnalités
- User Registration & Login (JWT)
- Add Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed
- Store Data in Database (PostgreSQL)

### 📁 Dossier
👉 [`task1_todolist/`](./task1_todolist)

---

## 🎯 Task 2 — Student Management System

Application de gestion des étudiants avec authentification JWT.

### 🛠️ Stack
- **Backend** : ASP.NET Core 9 + EF Core + PostgreSQL
- **Frontend** : Angular 19 + Bootstrap 5
- **Auth** : JWT + BCrypt

### ✅ Fonctionnalités
- User Registration & Login (JWT)
- Add Student Records
- Update Student Information
- Delete Student Records
- Search Students (recherche + filtre + tri + pagination)
- Database Integration (PostgreSQL)
- Responsive User Interface (Bootstrap)

### 📁 Dossier
👉 [`task2_student_management/`](./task2_student_management)

---

## 📁 Structure du projet
sathtern_tasks/
├── task1_todolist/ # ToDoList Application
│ ├── backend/ # API .NET
│ └── frontend/ # Interface Angular
│
├── task2_student_management/ # Student Management System
│ ├── backend/ # API .NET
│ └── frontend/ # Interface Angular
│
└── README.md # Ce fichier

text

---

## 🚀 Installation & Exécution

### Prérequis
- .NET 9 SDK
- Node.js 20+
- PostgreSQL 18

### Task 1 — ToDoList

```bash
# Backend
cd task1_todolist/backend/Sathtern.ToDoList.API
dotnet restore
dotnet ef database update
dotnet run

# Frontend (nouveau terminal)
cd task1_todolist/frontend
npm install
ng serve
Task 2 — Student Management
bash
# Backend
cd task2_student_management/backend/StudentManagement.API
dotnet restore
dotnet ef database update
dotnet run

# Frontend (nouveau terminal)
cd task2_student_management/frontend
npm install
ng serve
🔐 Sécurité
Mots de passe hashés avec BCrypt

Authentification JWT

Interceptor HTTP (token automatique)

Guard sur les routes protégées

CORS configuré pour Angular

👨‍💻 Auteur
Imad

🐙 GitHub : @1234imad

💼 LinkedIn : Ton Profil

📧 Email : ton.email@example.com

📝 Licence
MIT

text

⚠️ **Remplace** :
- `[Ton Profil]` → ton profil LinkedIn
- `ton.email@example.com` → ton email

💾 **Ctrl + S**

---

# 📄 FICHIER 2 — `task1_todolist/README.md`

**Clic droit** dans `task1_todolist/` → **Nouveau** → **Document texte** → renomme en **`README.md`**

**Ctrl + A** → **Suppr** → **Colle** :

```markdown
# ✅ Task 1 — ToDoList Application

Application de gestion de tâches avec authentification JWT.

## 🛠️ Stack technique

### Backend
- **ASP.NET Core 9** (Web API)
- **Entity Framework Core** (ORM)
- **PostgreSQL 18** (base de données)
- **JWT** (authentification)
- **BCrypt.Net** (hashage mots de passe)
- **Swagger** (documentation API)

### Frontend
- **Angular 19** (standalone components)
- **Bootstrap 5** (UI)
- **TypeScript**
- **RxJS**

## 📋 Fonctionnalités

- ✅ **User Registration & Login** (JWT)
- ✅ **Add Tasks** — Créer une tâche
- ✅ **Edit Tasks** — Modifier une tâche
- ✅ **Delete Tasks** — Supprimer une tâche
- ✅ **Mark Tasks as Completed** — Marquer comme terminée
- ✅ **Store Data in Database** — Persistance PostgreSQL

## 🚀 Installation

### Prérequis
- .NET 9 SDK
- Node.js 20+
- PostgreSQL 18

### 1️⃣ Backend

```bash
cd backend/Sathtern.ToDoList.API
dotnet restore
dotnet ef database update
dotnet run
API : http://localhost:5201

2️⃣ Frontend
bash
cd frontend
npm install
ng serve
App : http://localhost:4200

📡 Endpoints API
Méthode	Route	Auth	Description
POST	/api/Auth/register	❌	Inscription
POST	/api/Auth/login	❌	Connexion
GET	/api/Tasks	✅	Mes tâches
POST	/api/Tasks	✅	Créer une tâche
GET	/api/Tasks/{id}	✅	Détails
PUT	/api/Tasks/{id}	✅	Modifier
DELETE	/api/Tasks/{id}	✅	Supprimer
🗄️ Modèle de données
User
Id (Guid)

Username (string)

Email (string, unique)

PasswordHash (string)

CreatedAt (DateTime)

TaskItem
Id (Guid)

Title (string)

Description (string?)

Status (Todo / InProgress / Done)

Priority (Low / Medium / High)

DueDate (DateTime?)

CreatedAt, UpdatedAt (DateTime)

UserId (FK → User)

📁 Structure
text
task1_todolist/
├── backend/                    # API .NET
│   └── Sathtern.ToDoList.API/
│       ├── Controllers/
│       ├── Data/
│       ├── Models/
│       ├── Services/
│       ├── Migrations/
│       └── Program.cs
└── frontend/                   # Angular
    └── src/app/
        ├── core/
        └── features/
🔐 Sécurité
Mots de passe hashés avec BCrypt

Authentification JWT

Interceptor HTTP (token automatique)

Guard sur les routes protégées

Isolation des données par utilisateur

👨‍💻 Auteur
Imad — @1234imad

📝 Licence
MIT

text

💾 **Ctrl + S**

---

# 📄 FICHIER 3 — `task2_student_management/README.md`

**Clic droit** dans `task2_student_management/` → **Nouveau** → **Document texte** → renomme en **`README.md`**

**Ctrl + A** → **Suppr** → **Colle** :

```markdown
# ✅ Task 2 — Student Management System

Application de gestion des étudiants avec authentification JWT.

## 🛠️ Stack technique

### Backend
- **ASP.NET Core 9** (Web API)
- **Entity Framework Core** (ORM)
- **PostgreSQL 18** (base de données)
- **JWT** (authentification)
- **BCrypt.Net** (hashage mots de passe)
- **Swagger** (documentation API)

### Frontend
- **Angular 19** (standalone components)
- **Bootstrap 5** (UI)
- **TypeScript**
- **RxJS**

## 📋 Fonctionnalités

- ✅ **User Registration & Login** (JWT)
- ✅ **Add Student Records** — Ajouter un étudiant
- ✅ **Update Student Information** — Modifier un étudiant
- ✅ **Delete Student Records** — Supprimer un étudiant
- ✅ **Search Students** — Recherche + Filtre + Tri + Pagination
- ✅ **Database Integration** — Persistance PostgreSQL
- ✅ **Responsive User Interface** — Bootstrap responsive

## 🚀 Installation

### Prérequis
- .NET 9 SDK
- Node.js 20+
- PostgreSQL 18

### 1️⃣ Backend

```bash
cd backend/StudentManagement.API
dotnet restore
dotnet ef database update
dotnet run
API : http://localhost:5084

2️⃣ Frontend
bash
cd frontend
npm install
ng serve
App : http://localhost:4200

📡 Endpoints API
Méthode	Route	Auth	Description
POST	/api/Auth/register	❌	Inscription
POST	/api/Auth/login	❌	Connexion
GET	/api/Students	✅	Liste (recherche/tri/pagination)
POST	/api/Students	✅	Créer
GET	/api/Students/{id}	✅	Détails
PUT	/api/Students/{id}	✅	Modifier
DELETE	/api/Students/{id}	✅	Supprimer
🔍 Paramètres de recherche
text
GET /api/Students?search=ahmed&major=Informatique&sortBy=gpa&page=1&pageSize=10
Paramètre	Valeurs	Description
search	string	Nom, prénom ou email
major	string	Filière exacte
sortBy	name, gpa, enrollment, major	Champ de tri
page	int	Numéro de page (défaut : 1)
pageSize	int	Éléments par page (défaut : 10, max : 100)
🗄️ Modèle de données
User
Id (Guid)

Username (string)

Email (string, unique)

PasswordHash (string)

CreatedAt (DateTime)

Student
Id (Guid)

FirstName (string)

LastName (string)

Email (string, unique)

Phone (string)

DateOfBirth (DateTime)

Address (string)

Major (string)

GPA (decimal 3,2)

EnrollmentDate (DateTime)

CreatedAt, UpdatedAt (DateTime)

📁 Structure
text
task2_student_management/
├── backend/                    # API .NET
│   └── StudentManagement.API/
│       ├── Controllers/
│       ├── Data/
│       ├── Models/
│       ├── Services/
│       ├── Migrations/
│       └── Program.cs
└── frontend/                   # Angular
    └── src/app/
        ├── core/
        └── features/
🔐 Sécurité
Mots de passe hashés avec BCrypt

Authentification JWT

Interceptor HTTP (token automatique)

Guard sur les routes protégées

CORS configuré pour Angular

👨‍💻 Auteur
Imad — @1234imad
