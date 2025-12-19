import React from "react";
import type { ColumnDef } from "@tanstack/react-table";

type UserStatus = "active" | "inactive" | "graduated";

export type User = {
  id: string; // UUID
  user_id: string; // FK to users
  name: string;
  department: string;
  designation?: string; // Optional field for staff designation
  qualification?: string; // Made optional
  joining_date: string; // Date in ISO format (YYYY-MM-DD)
  status: UserStatus;
};

export type Student = {
  id: string; // UUID
  admission_no: string; // Unique admission number
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  dob: string; // Date of Birth in ISO format (YYYY-MM-DD)
  phone: string;
  guardian_name: string;
  address: string;
  admission_date: string; // Date in ISO format (YYYY-MM-DD)
  status: UserStatus;
  academic_year_id: string; // FK to academic_years
  department: string;
  qualification: string;
  joining_date: string; // Date in ISO format (YYYY-MM-DD)
};

export type Classroom = {
  id: string; // UUID PK
  grade_id: number; // 1-10
  division_id: "A" | "B" | "C";
  class_mode_id: "morning" | "evening";
  academic_year_id: string; // FK to academic_years
  teacher_id: string; // FK to users (homeroom teacher)
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

export type Subject = {
  id: string; // PK
  subject_name: string;
  department_id: string; // FK to departments
};

export type Batch = {
  id: string;
  batchName: string;
};

export type Department = {
  id: string;  // Changed from number to string
  name: string;
};

export type FeeSetting = {
  id: string;
  classroom_id: string;
  amount: number;
  academic_year_id: string;
};

export type DueFee = {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  siblingId?: string;
  feeAmount: number;
  dueMonths: number;
  lastPaidDate?: string;
  totalDue: number;
};

export const teachersData: User[] = [
  {
    id: "1",
    user_id: "user_1",
    name: "Ahmed Khan",
    department: "Quran",
    qualification: "Hafiz-ul-Quran, Ijazah in Qira'at",
    joining_date: "2020-01-15",
    status: "active",
  },
  {
    id: "2",
    user_id: "user_2",
    name: "Fatima Ali",
    department: "Fiqh",
    qualification: "Alimiyyah Degree, Specialization in Fiqh",
    joining_date: "2019-05-22",
    status: "active",
  },
  {
    id: "3",
    user_id: "user_3",
    name: "Yusuf Abdullah",
    department: "Hadeeth",
    qualification: "Masters in Hadith Sciences",
    joining_date: "2021-03-10",
    status: "active",
  },
  {
    id: "4",
    user_id: "user_4",
    name: "Aisha Mohammed",
    department: "Arabic",
    qualification: "PhD in Arabic Language and Literature",
    joining_date: "2018-11-05",
    status: "active",
  },
  {
    id: "5",
    user_id: "user_5",
    name: "Omar Farooq",
    department: "Islamic History",
    qualification: "MA in Islamic History and Civilization",
    joining_date: "2022-02-18",
    status: "active",
  },
  {
    id: "6",
    user_id: "user_6",
    name: "Maryam Ibrahim",
    department: "Quran",
    qualification: "Hafiza, Qaria with Ijazah in Hafs 'an 'Asim",
    joining_date: "2021-07-10",
    status: "active",
  },
  {
    id: "7",
    user_id: "user_7",
    name: "Khalid Hassan",
    department: "Fiqh",
    qualification: "Alim Course, Specialization in Hanafi Fiqh",
    joining_date: "2020-09-15",
    status: "active",
  },
  {
    id: "8",
    user_id: "user_8",
    name: "Zainab Ahmed",
    department: "Tajweed",
    qualification: "Ijazah in Tajweed and Qira'at",
    joining_date: "2021-01-10",
    status: "active",
  },
  {
    id: "9",
    user_id: "user_9",
    name: "Ibrahim Malik",
    department: "Islamic Finance",
    qualification: "PhD in Islamic Economics and Finance",
    joining_date: "2020-06-22",
    status: "active",
  },
  {
    id: "10",
    user_id: "user_10",
    name: "Amina Yusuf",
    department: "Quran Memorization",
    qualification: "Hafiza with Ijazah in Hafs and Shu'bah",
    joining_date: "2022-03-15",
    status: "active",
  },
  {
    id: "11",
    user_id: "user_11",
    name: "Mohammed Ali",
    department: "Seerah",
    qualification: "MA in Islamic Studies, Specialization in Seerah",
    joining_date: "2019-08-05",
    status: "inactive",
  },
  {
    id: "12",
    user_id: "user_12",
    name: "Sarah Johnson",
    department: "Islamic Psychology",
    qualification: "PhD in Psychology, Islamic Counseling Certification",
    joining_date: "2021-09-12",
    status: "active",
  },
  {
    id: "13",
    user_id: "user_13",
    name: "Abdul Rahman",
    department: "Fiqh",
    qualification: "Alim Course, Specialization in Shafi'i Fiqh",
    joining_date: "2020-04-18",
    status: "active",
  },
  {
    id: "14",
    user_id: "user_14",
    name: "Fatima Zahra",
    department: "Islamic Art",
    qualification: "MA in Islamic Art and Architecture",
    joining_date: "2022-01-25",
    status: "active",
  },
  {
    id: "15",
    user_id: "user_15",
    name: "Yasin Ahmed",
    department: "Quran",
    qualification: "Hafiz with Ijazah in Warsh 'an Nafi'",
    joining_date: "2021-05-30",
    status: "active",
  },
  {
    id: "16",
    user_id: "user_16",
    name: "Huda Mohammed",
    department: "Tafseer",
    qualification: "MA in Tafseer and Quranic Sciences",
    joining_date: "2019-11-14",
    status: "active",
  },
  {
    id: "17",
    user_id: "user_17",
    name: "Tariq Mahmood",
    department: "Islamic History",
    qualification: "PhD in Islamic Civilization",
    joining_date: "2020-07-22",
    status: "inactive",
  },
  {
    id: "18",
    user_id: "user_18",
    name: "Noor Fatima",
    department: "Arabic",
    qualification: "BA in Arabic Language, Teaching Certification",
    joining_date: "2022-04-05",
    status: "active",
  },
  {
    id: "19",
    user_id: "user_19",
    name: "Hamza Abdullah",
    department: "Fiqh",
    qualification: "Alim Course, Specialization in Maliki Fiqh",
    joining_date: "2021-02-18",
    status: "active",
  },
  {
    id: "20",
    user_id: "user_20",
    name: "Ayesha Rahman",
    department: "Quran",
    qualification: "Hafiza with Ijazah in Qalun 'an Nafi'",
    joining_date: "2020-10-30",
    status: "active",
  },
  {
    id: "21",
    user_id: "user_21",
    name: "Othman Ibrahim",
    department: "Islamic Finance",
    qualification: "MSc in Islamic Banking and Finance",
    joining_date: "2021-08-15",
    status: "active",
  },
  {
    id: "22",
    user_id: "user_22",
    name: "Sumayya Ahmed",
    department: "Tajweed",
    qualification: "Ijazah in Tajweed and Qira'at",
    joining_date: "2022-02-22",
    status: "active",
  },
  {
    id: "23",
    user_id: "user_23",
    name: "Bilal Hassan",
    department: "Hadith",
    qualification: "MA in Hadith Sciences",
    joining_date: "2020-03-17",
    status: "active",
  },
  {
    id: "24",
    user_id: "user_24",
    name: "Zahra Mohammed",
    department: "Islamic Psychology",
    qualification: "PhD in Clinical Psychology, Islamic Counseling",
    joining_date: "2021-11-05",
    status: "active",
  },
  {
    id: "25",
    user_id: "user_25",
    name: "Kareem Abdullah",
    department: "Seerah",
    qualification: "MA in Islamic Studies",
    joining_date: "2020-12-10",
    status: "inactive",
  },
  {
    id: "26",
    user_id: "user_26",
    name: "Mariam Khan",
    department: "Quran Memorization",
    qualification: "Hafiza with Ijazah in multiple Qira'at",
    joining_date: "2022-01-18",
    status: "active",
  },
  {
    id: "27",
    user_id: "user_27",
    name: "Idris Malik",
    department: "Islamic Finance",
    qualification: "PhD in Islamic Economics",
    joining_date: "2019-09-22",
    status: "active",
  },
  {
    id: "28",
    user_id: "user_28",
    name: "Amina Hassan",
    department: "Tafseer",
    qualification: "MA in Tafseer and Quranic Exegesis",
    joining_date: "2021-06-30",
    status: "active",
  },
  {
    id: "29",
    user_id: "user_29",
    name: "Yahya Ali",
    department: "Fiqh",
    qualification: "Alim Course, Specialization in Hanbali Fiqh",
    joining_date: "2020-08-14",
    status: "active",
  },
  {
    id: "30",
    user_id: "user_30",
    name: "Safiya Rahman",
    department: "Islamic Art",
    qualification: "BA in Fine Arts, Islamic Calligraphy",
    joining_date: "2022-03-08",
    status: "active",
  },
  {
    id: "31",
    user_id: "user_31",
    name: "Musa Ibrahim",
    department: "Quran",
    qualification: "Hafiz with Ijazah in Al-Duri 'an Abi Amr",
    joining_date: "2021-04-25",
    status: "active",
  },
  {
    id: "32",
    user_id: "user_32",
    name: "Aisha Abdullah",
    department: "Islamic History",
    qualification: "PhD in Islamic Civilization and History",
    joining_date: "2019-12-15",
    status: "active",
  },
];

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user_id",
    header: "User ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "qualification",
    header: "Qualification",
  },
  {
    accessorKey: "joining_date",
    header: "Joining Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: User } }) => {
      const status = row.original.status;
      return React.createElement(
        "span",
        {
          className: `px-2 py-1 rounded-full text-xs ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`,
        },
        status.charAt(0).toUpperCase() + status.slice(1)
      );
    },
  },
  // {
  //   accessorKey: "actions",
  //   header: "",
  // },
];

export const staffData: User[] = [
  {
    id: "1",
    user_id: "user_101",
    name: "Abdul Rahman",
    department: "Administration",
    designation: "Principal",
    joining_date: "2018-06-15",
    status: "active",
  },
  {
    id: "2",
    user_id: "user_102",
    name: "Aisha Mohammed",
    department: "Administration",
    designation: "Vice Principal",
    joining_date: "2019-03-22",
    status: "active",
  },
  {
    id: "3",
    user_id: "user_103",
    name: "Omar Farooq",
    department: "Accounts",
    designation: "Accountant",
    joining_date: "2020-01-10",
    status: "active",
  },
  {
    id: "4",
    user_id: "user_104",
    name: "Fatima Ali",
    department: "Reception",
    designation: "Receptionist",
    joining_date: "2021-05-18",
    status: "active",
  },
  {
    id: "5",
    user_id: "user_105",
    name: "Yusuf Khan",
    department: "Maintenance",
    designation: "Facility Manager",
    joining_date: "2019-11-05",
    status: "active",
  },
  {
    id: "6",
    user_id: "user_106",
    name: "Zainab Ahmed",
    department: "IT",
    designation: "IT Support",
    joining_date: "2021-02-28",
    status: "active",
  },
  {
    id: "7",
    user_id: "user_107",
    name: "Khalid Hassan",
    department: "Security",
    designation: "Security Head",
    joining_date: "2020-07-12",
    status: "inactive",
  },
  {
    id: "8",
    user_id: "user_108",
    name: "Maryam Ibrahim",
    department: "Library",
    designation: "Librarian",
    joining_date: "2021-08-15",
    status: "active",
  },
  {
    id: "9",
    user_id: "user_109",
    name: "Ibrahim Malik",
    department: "Transport",
    designation: "Transport Incharge",
    joining_date: "2020-09-22",
    status: "active",
  },
  {
    id: "10",
    user_id: "user_110",
    name: "Amina Yusuf",
    department: "HR",
    designation: "HR Manager",
    joining_date: "2019-04-10",
    status: "active",
  },
];

export const staffColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user_id",
    header: "User ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "joining_date",
    header: "Joining Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: User } }) => {
      const status = row.original.status;
      return React.createElement(
        "span",
        {
          className: `px-2 py-1 rounded-full text-xs ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`,
        },
        status.charAt(0).toUpperCase() + status.slice(1)
      );
    },
  },
  // {
  //   accessorKey: "actions",
  //   header: "",
  // },
];

export const studentsData: Student[] = [
  {
    id: "1",
    admission_no: "STU2023001",
    first_name: "Mohammed",
    last_name: "Ahmed",
    gender: "male",
    dob: "2015-03-15",
    phone: "501234567",
    guardian_name: "Ahmed Mohammed",
    address: "123 Al Maktoum St, Dubai",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "2",
    admission_no: "STU2023002",
    first_name: "Fatima",
    last_name: "Ali",
    gender: "female",
    dob: "2016-05-22",
    phone: "551234567",
    guardian_name: "Ali Hassan",
    address: "456 Sheikh Zayed Rd, Dubai",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "3",
    admission_no: "STU2023003",
    first_name: "Omar",
    last_name: "Khalid",
    gender: "male",
    dob: "2015-11-10",
    phone: "521234567",
    guardian_name: "Khalid Omar",
    address: "789 Al Wasl Rd, Dubai",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "4",
    admission_no: "STU2023004",
    first_name: "Aisha",
    last_name: "Yusuf",
    gender: "female",
    dob: "2016-07-18",
    phone: "581234567",
    guardian_name: "Yusuf Ahmed",
    address: "321 Jumeirah St, Dubai",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "5",
    admission_no: "STU2022001",
    first_name: "Ahmed",
    last_name: "Ibrahim",
    gender: "male",
    dob: "2014-09-25",
    phone: "501234568",
    guardian_name: "Ibrahim Mohammed",
    address: "654 Al Barsha, Dubai",
    admission_date: "2022-09-01",
    status: "graduated",
    academic_year_id: "2",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2022-09-01",
  },
  {
    id: "6",
    admission_no: "STU2023006",
    first_name: "Mariam",
    last_name: "Omar",
    gender: "female",
    dob: "2016-09-05",
    phone: "561234567",
    guardian_name: "Omar Khalid",
    address: "987 Corniche Rd, Abu Dhabi",
    admission_date: "2023-09-01",
    status: "inactive",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "7",
    admission_no: "STU2023007",
    first_name: "Khalid",
    last_name: "Hassan",
    gender: "male",
    dob: "2015-12-12",
    phone: "571234567",
    guardian_name: "Hassan Ahmed",
    address: "159 Al Bateen St, Abu Dhabi",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "8",
    admission_no: "STU2023008",
    first_name: "Layla",
    last_name: "Mohammed",
    gender: "female",
    dob: "2016-03-30",
    phone: "591234567",
    guardian_name: "Mohammed Ali",
    address: "753 Al Nahyan St, Abu Dhabi",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "9",
    admission_no: "STU2023007",
    first_name: "Khalid",
    last_name: "Abdullah",
    gender: "male",
    dob: "2015-04-12",
    phone: "501234570",
    guardian_name: "Abdullah Khalid",
    address: "246 Al Barsha, Dubai",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "10",
    admission_no: "STU2023005",
    first_name: "Yusuf",
    last_name: "Ibrahim",
    gender: "male",
    dob: "2015-02-25",
    phone: "541234567",
    guardian_name: "Ibrahim Ali",
    address: "654 Al Falah St, Abu Dhabi",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "11",
    admission_no: "STU2023011",
    first_name: "Abdullah",
    last_name: "Mohammed",
    gender: "male",
    dob: "2015-06-18",
    phone: "551234568",
    guardian_name: "Mohammed Ali",
    address: "111 Al Karama, Dubai",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "12",
    admission_no: "STU2023012",
    first_name: "Amina",
    last_name: "Omar",
    gender: "female",
    dob: "2016-01-22",
    phone: "521234568",
    guardian_name: "Omar Khalid",
    address: "222 Al Qusais, Dubai",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "13",
    admission_no: "STU2023013",
    first_name: "Ibrahim",
    last_name: "Yousef",
    gender: "male",
    dob: "2015-08-14",
    phone: "581234568",
    guardian_name: "Yousef Ahmed",
    address: "333 Al Nahda, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "14",
    admission_no: "STU2023014",
    first_name: "Zainab",
    last_name: "Khalid",
    gender: "female",
    dob: "2016-04-30",
    phone: "561234568",
    guardian_name: "Khalid Omar",
    address: "444 Al Majaz, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "15",
    admission_no: "STU2023015",
    first_name: "Omar",
    last_name: "Ahmed",
    gender: "male",
    dob: "2015-11-05",
    phone: "501234571",
    guardian_name: "Ahmed Ali",
    address: "555 Al Qasba, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "16",
    admission_no: "STU2023016",
    first_name: "Huda",
    last_name: "Mohammed",
    gender: "female",
    dob: "2016-07-12",
    phone: "551234569",
    guardian_name: "Mohammed Hassan",
    address: "666 Al Khan, Ajman",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "17",
    admission_no: "STU2023017",
    first_name: "Yousef",
    last_name: "Abdul",
    gender: "male",
    dob: "2015-09-23",
    phone: "521234569",
    guardian_name: "Abdul Rahman",
    address: "777 Al Jurf, Ajman",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "18",
    admission_no: "STU2023018",
    first_name: "Layla",
    last_name: "Kareem",
    gender: "female",
    dob: "2016-02-17",
    phone: "581234569",
    guardian_name: "Kareem Ahmed",
    address: "888 Al Hamra, Ras Al Khaimah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "19",
    admission_no: "STU2023019",
    first_name: "Khalid",
    last_name: "Nasser",
    gender: "male",
    dob: "2015-12-08",
    phone: "561234569",
    guardian_name: "Nasser Ali",
    address: "999 Al Dhaid, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "20",
    admission_no: "STU2023020",
    first_name: "Aisha",
    last_name: "Tariq",
    gender: "female",
    dob: "2016-06-19",
    phone: "501234572",
    guardian_name: "Tariq Mohammed",
    address: "1010 Al Qusaidat, Fujairah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "21",
    admission_no: "STU2023021",
    first_name: "Mohammed",
    last_name: "Saif",
    gender: "male",
    dob: "2015-10-11",
    phone: "551234570",
    guardian_name: "Saif Ahmed",
    address: "1111 Al Aqah, Fujairah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "22",
    admission_no: "STU2023022",
    first_name: "Fatima",
    last_name: "Majid",
    gender: "female",
    dob: "2016-03-25",
    phone: "521234570",
    guardian_name: "Majid Omar",
    address: "1212 Al Madam, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "23",
    admission_no: "STU2023023",
    first_name: "Omar",
    last_name: "Faisal",
    gender: "male",
    dob: "2015-07-16",
    phone: "581234570",
    guardian_name: "Faisal Khalid",
    address: "1313 Al Dhaid Road, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "24",
    admission_no: "STU2023024",
    first_name: "Mariam",
    last_name: "Waleed",
    gender: "female",
    dob: "2016-01-09",
    phone: "561234570",
    guardian_name: "Waleed Ali",
    address: "1414 Al Qasimia, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "25",
    admission_no: "STU2023025",
    first_name: "Ahmed",
    last_name: "Hamad",
    gender: "male",
    dob: "2015-05-27",
    phone: "501234573",
    guardian_name: "Hamad Khalifa",
    address: "1515 Al Taawun, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "26",
    admission_no: "STU2023026",
    first_name: "Aisha",
    last_name: "Sultan",
    gender: "female",
    dob: "2016-08-14",
    phone: "551234571",
    guardian_name: "Sultan Mohammed",
    address: "1616 Al Majaz, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "27",
    admission_no: "STU2023027",
    first_name: "Khalid",
    last_name: "Rashid",
    gender: "male",
    dob: "2015-11-30",
    phone: "521234571",
    guardian_name: "Rashid Ahmed",
    address: "1717 Al Khan, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "28",
    admission_no: "STU2023028",
    first_name: "Noor",
    last_name: "Hassan",
    gender: "female",
    dob: "2016-05-22",
    phone: "581234571",
    guardian_name: "Hassan Ali",
    address: "1818 Al Nahda, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
  {
    id: "29",
    admission_no: "STU2023029",
    first_name: "Yousef",
    last_name: "Ibrahim",
    gender: "male",
    dob: "2015-09-03",
    phone: "561234571",
    guardian_name: "Ibrahim Khalid",
    address: "1919 Al Qasba, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Quran",
    qualification: "Hafiz",
    joining_date: "2023-09-01",
  },
  {
    id: "30",
    admission_no: "STU2023030",
    first_name: "Sarah",
    last_name: "Omar",
    gender: "female",
    dob: "2016-02-28",
    phone: "501234574",
    guardian_name: "Omar Nasser",
    address: "2020 Al Majaz, Sharjah",
    admission_date: "2023-09-01",
    status: "active",
    academic_year_id: "1",
    department: "Islamic Studies",
    qualification: "Student",
    joining_date: "2023-09-01",
  },
];

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "admission_no",
    header: "Admission No",
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      return `${row.original.first_name} ${row.original.last_name}`;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "guardian_name",
    header: "Guardian Name",
  },
  {
    accessorKey: "joining_date",
    header: "Joining Date",
    cell: ({ row }) => {
      return new Date(row.original.joining_date).toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: Student } }) => {
      const status = row.original.status;
      return React.createElement(
        "span",
        {
          className: `px-2 py-1 rounded-full text-xs ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`,
        },
        status.charAt(0).toUpperCase() + status.slice(1)
      );
    },
  },
];

export const classroomColumns: ColumnDef<Classroom>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "grade_id",
    header: "Grade",
  },
  {
    accessorKey: "division_id",
    header: "Division",
  },
  {
    accessorKey: "class_mode_id",
    header: "Batch",
    cell: ({ row }: { row: { original: Classroom } }) => {
      const mode = row.original.class_mode_id;
      return mode.charAt(0).toUpperCase() + mode.slice(1);
    },
  },
  {
    accessorKey: "academic_year_id",
    header: "Academic Year",
  },
  {
    accessorKey: "teacher_id",
    header: "Homeroom Teacher",
    // In a real app, you'd want to join with users table to get teacher name
    cell: ({ row }) => `Teacher ${row.original.teacher_id.substring(0, 5)}...`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: Classroom } }) => {
      const status = row.original.status;
      return React.createElement(
        "span",
        {
          className: `px-2 py-1 rounded-full text-xs ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`,
        },
        status.charAt(0).toUpperCase() + status.slice(1)
      );
    },
  },
];

// // Helper function to generate UUID
// const generateId = () => `cls-${Math.random().toString(36).substr(2, 9)}`;

// // Current academic year
// const currentYear = new Date().getFullYear();
// const nextYear = currentYear + 1;
// const academicYearId = `${currentYear}-${nextYear.toString().slice(2)}`;

export const classroomData: Classroom[] = [
  {
    id: "1",
    grade_id: 1,
    division_id: "A",
    class_mode_id: "morning",
    academic_year_id: "2023-24",
    teacher_id: "tchr-001",
    status: "active",
    created_at: "2023-06-01T08:00:00Z",
    updated_at: "2023-06-01T08:00:00Z",
  },
  {
    id: "2",
    grade_id: 1,
    division_id: "B",
    class_mode_id: "morning",
    academic_year_id: "2023-24",
    teacher_id: "tchr-002",
    status: "active",
    created_at: "2023-06-01T08:00:00Z",
    updated_at: "2023-06-01T08:00:00Z",
  },
  {
    id: "3",
    grade_id: 2,
    division_id: "A",
    class_mode_id: "morning",
    academic_year_id: "2023-24",
    teacher_id: "tchr-003",
    status: "active",
    created_at: "2023-06-01T08:00:00Z",
    updated_at: "2023-06-01T08:00:00Z",
  },
  {
    id: "4",
    grade_id: 5,
    division_id: "A",
    class_mode_id: "evening",
    academic_year_id: "2023-24",
    teacher_id: "tchr-004",
    status: "active",
    created_at: "2023-06-01T08:00:00Z",
    updated_at: "2023-06-01T08:00:00Z",
  },
  {
    id: "5",
    grade_id: 5,
    division_id: "B",
    class_mode_id: "evening",
    academic_year_id: "2023-24",
    teacher_id: "tchr-005",
    status: "inactive",
    created_at: "2023-06-01T08:00:00Z",
    updated_at: "2023-06-01T08:00:00Z",
  },
];

export const subjectsData: Subject[] = [
  {
    id: "sub-001",
    subject_name: "Quran Recitation",
    department_id: "dept-001",
  },
  {
    id: "sub-002",
    subject_name: "Tajweed",
    department_id: "dept-001",
  },
  {
    id: "sub-003",
    subject_name: "Fiqh",
    department_id: "dept-002",
  },
  {
    id: "sub-004",
    subject_name: "Hadith",
    department_id: "dept-002",
  },
  {
    id: "sub-005",
    subject_name: "Arabic Language",
    department_id: "dept-003",
  },
];

export const subjectColumns: ColumnDef<Subject>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "subject_name",
    header: "Subject Name",
  },
  {
    accessorKey: "department_id",
    header: "Department ID",
  },
];

export const batchColumns: ColumnDef<Batch>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "batchName",
    header: "Batch Name",
  },
];

export const batchData: Batch[] = [
  {
    id: "1",
    batchName: "Morning Batch",
  },
  {
    id: "2",
    batchName: "Evening Batch",
  },
  {
    id: "3",
    batchName: "Weekend Batch",
  },
  {
    id: "4",
    batchName: "Special Batches",
  },
];

export const departmentsData: Department[] = [
  { id: "1", name: "Quran" },
  { id: "2", name: "Hadith" },
  { id: "3", name: "Fiqh" },
];

export const departmentsColumns: ColumnDef<Department>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Department Name",
  },
];

export const feeSettingsColumns: ColumnDef<FeeSetting>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "classroom_id",
    header: "Classroom",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "academic_year_id",
    header: "Academic Year",
  },
];

export const feeSettingsData: FeeSetting[] = [
  { 
    id: "1", 
    classroom_id: "class_1", 
    amount: 100.00, 
    academic_year_id: "2023-2024" 
  },
  { 
    id: "2", 
    classroom_id: "class_2", 
    amount: 120.00, 
    academic_year_id: "2023-2024" 
  },
  { 
    id: "3", 
    classroom_id: "class_3", 
    amount: 140.00, 
    academic_year_id: "2023-2024" 
  },
  { 
    id: "4", 
    classroom_id: "class_4", 
    amount: 160.00, 
    academic_year_id: "2023-2024" 
  },
  { 
    id: "5", 
    classroom_id: "class_5", 
    amount: 180.00, 
    academic_year_id: "2023-2024" 
  },
];

export const dueFeesData: DueFee[] = [
  {
    id: "df1",
    studentId: "1",
    studentName: "Mohammed Ali",
    className: "Class 1A",
    siblingId: "2",
    feeAmount: 100,
    dueMonths: 3, // Will show next 3 months from last paid
    lastPaidDate: "2023-11-30", // Last paid for November
    totalDue: 300
  },
  {
    id: "df2",
    studentId: "3",
    studentName: "Ahmed Khan",
    className: "Class 2B",
    feeAmount: 120,
    dueMonths: 2, // Will show 2 months from last paid
    lastPaidDate: "2023-10-31", // Last paid for October
    totalDue: 240
  },
  {
    id: "df3",
    studentId: "5",
    studentName: "Fatima Ahmed",
    className: "Class 3A",
    siblingId: "7",
    feeAmount: 110,
    dueMonths: 4, // Will show 4 months from last paid
    lastPaidDate: "2023-09-30", // Last paid for September
    totalDue: 440
  },
  {
    id: "df4",
    studentId: "8",
    studentName: "Yusuf Abdullah",
    className: "Class 4B",
    feeAmount: 130,
    dueMonths: 1, // Will show 1 month from last paid
    lastPaidDate: "2023-12-15", // Recently paid, only 1 month due
    totalDue: 130
  },
  {
    id: "df5",
    studentId: "10",
    studentName: "Aisha Mohammed",
    className: "Class 5A",
    siblingId: "12",
    feeAmount: 140,
    dueMonths: 5, // Will show 5 months from last paid
    lastPaidDate: "2023-08-31", // Last paid for August
    totalDue: 700
  }
];

export const dueFeesColumns: ColumnDef<DueFee>[] = [
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
  },
  {
    accessorKey: "className",
    header: "Class",
  },
  {
    accessorKey: "siblingId",
    header: "Sibling ID",
    cell: ({ row }) => row.original.siblingId || "-"
  },
  {
    accessorKey: "feeAmount",
    header: "Monthly Fee",
    cell: ({ row }) => `$${row.original.feeAmount.toFixed(2)}`
  },
  {
    accessorKey: "dueMonths",
    header: "Due Months",
    cell: ({ row }) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const lastPaidDate = row.original.lastPaidDate;
      const dueMonths = row.original.dueMonths;
      
      if (!lastPaidDate) {
        return 'N/A'; // or any other fallback you prefer
      }
      
      const lastPaid = new Date(lastPaidDate);
      // Get the month after the last paid month
      let startMonth = lastPaid.getMonth() + 1; // +1 because we want the next month
      let startYear = lastPaid.getFullYear();
      
      // Handle December to January transition
      if (startMonth > 11) {
        startMonth = 0; // January
        startYear++;
      }
      
      // Get the due months starting from the month after last paid
      const monthNames = [];
      for (let i = 0; i < dueMonths; i++) {
        const monthIndex = (startMonth + i) % 12;
        const year = startYear + Math.floor((startMonth + i) / 12);
        monthNames.push(months[monthIndex]);
        
        // Only show the year if it's different from current year and not already shown
        if (year !== startYear) {
          monthNames[monthNames.length - 1] += ` '${year.toString().slice(-2)}`;
        }
      }
      
      // Format as "Feb, Mar + 1 more" if more than 2 months
      if (monthNames.length > 2) {
        return `${monthNames[0]}, ${monthNames[1]} + ${monthNames.length - 2} more`;
      }
      return monthNames.join(", ");
    }
  },
  {
    accessorKey: "lastPaidDate",
    header: "Last Paid Date",
  },
  {
    accessorKey: "totalDue",
    header: "Total Due",
    cell: ({ row }) => `$${row.original.totalDue.toFixed(2)}`
  }
];

// Transaction data type
export type Transaction = {
  id: string;
  date: string;
  name: string;
  studentId: string;
  amount: number;
  paymentType: 'cash' | 'card';
};

// Transaction columns
export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row.original.date,
  },
  {
    accessorKey: 'name',
    header: 'Student Name',
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: 'studentId',
    header: 'Student ID',
    cell: ({ row }) => row.original.studentId,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
  },
  {
    accessorKey: 'paymentType',
    header: 'Payment Type',
    cell: ({ row }) => row.original.paymentType.charAt(0).toUpperCase() + row.original.paymentType.slice(1),
  },
];

// Sample transaction data
export const transactionData: Transaction[] = [
  {
    id: '1',
    date: '2025-12-19',
    name: 'Ahmed Khan',
    studentId: 'STU001',
    amount: 150.00,
    paymentType: 'cash',
  },
  {
    id: '2',
    date: '2025-12-18',
    name: 'Fatima Ali',
    studentId: 'STU042',
    amount: 200.00,
    paymentType: 'card',
  },
  {
    id: '3',
    date: '2025-12-17',
    name: 'Omar Hassan',
    studentId: 'STU123',
    amount: 175.50,
    paymentType: 'cash',
  },
  {
    id: '4',
    date: '2025-12-16',
    name: 'Aisha Mohammed',
    studentId: 'STU087',
    amount: 225.75,
    paymentType: 'card',
  },
  {
    id: '5',
    date: '2025-12-15',
    name: 'Yusuf Abdullah',
    studentId: 'STU156',
    amount: 190.25,
    paymentType: 'cash',
  },
];