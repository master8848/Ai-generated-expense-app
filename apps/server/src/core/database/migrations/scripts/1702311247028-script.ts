import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('b9a5376c-787b-41eb-945e-9251a0ee7fea', '8Taryn80@gmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=10', 'cus_K1b2c3d4e5f6g7', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('f7a6d0bd-086f-4f0d-b199-e620cc8544dd', '15Titus40@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=17', 'cus_N4e5f6g7h8i9j0', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('4e35dd3f-a6ed-433c-9a0b-7925570fb917', '22Bettie.Marvin-Mraz37@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=24', 'cus_J0a1b2c3d4e5f6', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('64a7da0e-cfd7-4d07-b959-8d021299313b', '29Spencer_Orn36@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=31', 'cus_M3d4e5f6g7h8i9', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('0f5e0bce-d4b4-4cc0-af7e-fdee7630692b', '36Vincenza.Gutkowski85@yahoo.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=38', 'cus_M3d4e5f6g7h8i9', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('fcf6414c-6218-4398-94c1-2680a3c50246', '43Kari_Schaden63@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_K1b2c3d4e5f6g7', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('48882358-d3ff-4583-93fe-a8fd4de92b92', '50Bell81@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=52', 'cus_M3d4e5f6g7h8i9', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('5990eb0c-9c8e-4835-92c8-b25cbe4b99a3', '57Vince27@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=59', 'cus_J0a1b2c3d4e5f6', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('5bf3b658-90e5-4366-a3f5-1d6a75e04192', '64Amani.Berge-Hills80@hotmail.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=66', 'cus_L2c3d4e5f6g7h8', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('329557c0-b564-45fe-95b0-3600fc0a46c4', 'Expense Report Submitted', 'Your project has been updated successfully.', 'Alice Johnson', '74Kiel_Schumm5@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=75', 'https://i.imgur.com/YfJQV5z.png?id=76', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('80aaff7a-5d80-4d78-a756-2d4d20277ecf', 'Expense Report Submitted', 'Your project has been updated successfully.', 'John Doe', '81Walter.Homenick76@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=82', 'https://i.imgur.com/YfJQV5z.png?id=83', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('30d364e6-ec54-4a3a-8651-dc0dfbb325c2', 'Organization Invitation', 'You have a new comment on your post.', 'Alice Johnson', '88Dedrick.Pouros68@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=89', 'https://i.imgur.com/YfJQV5z.png?id=90', 'b9a5376c-787b-41eb-945e-9251a0ee7fea');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('fa5edf07-c8bd-4b1b-81d1-9b0ea979eb52', 'Task Assigned', 'You have been invited to join a new organization.', 'John Doe', '95Wanda_Miller72@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=96', 'https://i.imgur.com/YfJQV5z.png?id=97', '48882358-d3ff-4583-93fe-a8fd4de92b92');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('4e7abb96-61b1-4439-a837-ab802503d9db', 'Expense Report Submitted', 'You have been invited to join a new organization.', 'John Doe', '102Chanelle51@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=103', 'https://i.imgur.com/YfJQV5z.png?id=104', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('f7e91d5a-e78b-4251-a0b4-6d7e3e5a0dcf', 'Project Update', 'You have a new comment on your post.', 'Charlie Davis', '109Amelia_Dicki25@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=110', 'https://i.imgur.com/YfJQV5z.png?id=111', 'f7a6d0bd-086f-4f0d-b199-e620cc8544dd');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('fdfad385-9fc4-4fb0-a4ff-c3f0732feab8', 'Task Assigned', 'Your expense report has been submitted for review.', 'Charlie Davis', '116Carrie_Larson@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=117', 'https://i.imgur.com/YfJQV5z.png?id=118', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('a32f5807-8849-41ff-8f78-849fdb942704', 'Task Assigned', 'You have a new comment on your post.', 'Bob Brown', '123Adaline_Kris@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=124', 'https://i.imgur.com/YfJQV5z.png?id=125', 'f7a6d0bd-086f-4f0d-b199-e620cc8544dd');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('887e42a9-235f-4285-99a5-70dc39fe8a89', 'Expense Report Submitted', 'You have been invited to join a new organization.', 'Bob Brown', '130Talon.Boyer56@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=131', 'https://i.imgur.com/YfJQV5z.png?id=132', '5990eb0c-9c8e-4835-92c8-b25cbe4b99a3');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('c05e4878-0b7b-453e-ac78-492733a199e2', 'Organization Invitation', 'You have a new comment on your post.', 'John Doe', '137Wayne_Ritchie@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=138', 'https://i.imgur.com/YfJQV5z.png?id=139', '4e35dd3f-a6ed-433c-9a0b-7925570fb917');

INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('29b489ed-0be0-4a94-a88d-28ddbf82d7c8', 'Quantum Leap Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=142');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('8c0b35a0-1416-4c61-8fff-78f0ce4697c2', 'Green Earth Solutions', 'https://i.imgur.com/YfJQV5z.png?id=145');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('e16d3a57-4c07-4977-95cd-ecf9ec8107ad', 'Quantum Leap Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=148');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('2506a867-8c0a-4ac4-83dd-ce7e22768545', 'NextGen Technologies', 'https://i.imgur.com/YfJQV5z.png?id=151');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('4017546a-eb18-4912-951d-12912563f60e', 'NextGen Technologies', 'https://i.imgur.com/YfJQV5z.png?id=154');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('c467b1bb-acdc-4b2e-ac7a-50bd6ba36c20', 'NextGen Technologies', 'https://i.imgur.com/YfJQV5z.png?id=157');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('ac383743-cbbc-4751-9822-9855e40b8948', 'Green Earth Solutions', 'https://i.imgur.com/YfJQV5z.png?id=160');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('84e82821-6aec-4535-81eb-392e6f83f6cd', 'Green Earth Solutions', 'https://i.imgur.com/YfJQV5z.png?id=163');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('b59f95f1-2fe5-4bc0-a5f2-adababc8c9e9', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=166');
INSERT INTO "organization" ("id", "name", "logoUrl") VALUES ('0f3239a6-d549-407e-87a1-587b2379d977', 'NextGen Technologies', 'https://i.imgur.com/YfJQV5z.png?id=169');

INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('dfded2ca-3b0f-4018-b06d-520e2131bd79', 'Viewer', 'f7a6d0bd-086f-4f0d-b199-e620cc8544dd', '84e82821-6aec-4535-81eb-392e6f83f6cd');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('c146ef5e-3352-47e5-9f63-27aefe088015', 'Member', '64a7da0e-cfd7-4d07-b959-8d021299313b', 'e16d3a57-4c07-4977-95cd-ecf9ec8107ad');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('299332c0-2e91-45e4-887a-2552e1e9a2ec', 'Owner', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ac383743-cbbc-4751-9822-9855e40b8948');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('d7298b5f-0084-4f1b-8434-3a6b0507983f', 'Owner', 'f7a6d0bd-086f-4f0d-b199-e620cc8544dd', '4017546a-eb18-4912-951d-12912563f60e');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('dfb3486e-8ac4-4a0c-87f3-e985cb71f794', 'Member', '0f5e0bce-d4b4-4cc0-af7e-fdee7630692b', '29b489ed-0be0-4a94-a88d-28ddbf82d7c8');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('0f4e85d7-bc95-44ec-8bd6-54de08e63875', 'Member', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'b59f95f1-2fe5-4bc0-a5f2-adababc8c9e9');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('5743b01a-0842-41b7-8fc1-e1d730c95d4f', 'Viewer', 'f7a6d0bd-086f-4f0d-b199-e620cc8544dd', 'e16d3a57-4c07-4977-95cd-ecf9ec8107ad');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('395119f8-7e8c-4412-a501-c0cfb8ca1d63', 'Viewer', '4e35dd3f-a6ed-433c-9a0b-7925570fb917', 'b59f95f1-2fe5-4bc0-a5f2-adababc8c9e9');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('ac9228a8-0732-4bba-a923-594fe2d1139e', 'Viewer', '64a7da0e-cfd7-4d07-b959-8d021299313b', 'ac383743-cbbc-4751-9822-9855e40b8948');
INSERT INTO "user_organization" ("id", "role", "userId", "organizationId") VALUES ('84999141-1f30-4701-8e3f-e293f836e92d', 'Admin', '5bf3b658-90e5-4366-a3f5-1d6a75e04192', 'c467b1bb-acdc-4b2e-ac7a-50bd6ba36c20');

INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('478a0dd0-ae6a-450f-9bf3-d0268684e23d', 'Finance Manager', 'An initiative to monitor and manage financial transactions.', '2024-03-26T22:05:48.109Z', '2023-12-27T03:02:41.463Z', '2506a867-8c0a-4ac4-83dd-ce7e22768545');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('0618e2e4-212b-4378-8480-b82bbeb85fb7', 'Cost Analyzer', 'A system designed to analyze and report on spending.', '2024-03-02T09:43:46.050Z', '2025-05-17T14:56:19.780Z', 'c467b1bb-acdc-4b2e-ac7a-50bd6ba36c20');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('0c1c1cd5-f6d1-4663-bb99-56593c74175c', 'Project Alpha', 'A project aimed at optimizing cost management.', '2023-09-21T22:04:20.789Z', '2024-04-20T18:00:25.376Z', 'b59f95f1-2fe5-4bc0-a5f2-adababc8c9e9');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('d897a29a-8a86-44c9-b009-92a3e7077b50', 'Finance Manager', 'A project to track all expenses and budgets.', '2024-06-22T09:19:41.220Z', '2024-07-28T04:47:39.084Z', '0f3239a6-d549-407e-87a1-587b2379d977');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('15685b3d-3f73-45c2-8dc9-226db3432894', 'Budget Tracker', 'A project aimed at optimizing cost management.', '2025-01-17T05:46:46.783Z', '2024-09-01T02:31:46.837Z', '4017546a-eb18-4912-951d-12912563f60e');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('b1793a58-e8ab-4d37-aabf-8b1136ed7576', 'Expense Monitor', 'An initiative to monitor and manage financial transactions.', '2023-09-02T04:56:20.147Z', '2025-05-18T10:04:39.893Z', 'e16d3a57-4c07-4977-95cd-ecf9ec8107ad');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('530751e0-bf00-46c7-b100-2e6c6899a539', 'Finance Manager', 'A system designed to analyze and report on spending.', '2023-10-01T14:50:01.524Z', '2024-03-26T17:40:20.318Z', 'c467b1bb-acdc-4b2e-ac7a-50bd6ba36c20');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('1e7a3e66-fc68-49f5-8e97-c771a9329c36', 'Finance Manager', 'A project to track all expenses and budgets.', '2025-03-07T09:30:00.213Z', '2025-01-02T18:54:29.783Z', '8c0b35a0-1416-4c61-8fff-78f0ce4697c2');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('f240a8a4-54e2-4c4c-a849-4d70c4991b24', 'Budget Tracker', 'A project aimed at optimizing cost management.', '2024-11-02T06:07:39.729Z', '2025-04-19T22:27:24.460Z', '84e82821-6aec-4535-81eb-392e6f83f6cd');
INSERT INTO "project" ("id", "name", "description", "startDate", "endDate", "organizationId") VALUES ('8f260144-750e-4163-a7a4-6b46305b8d6d', 'Finance Manager', 'An initiative to monitor and manage financial transactions.', '2023-06-16T09:13:37.275Z', '2024-06-11T10:24:57.281Z', 'ac383743-cbbc-4751-9822-9855e40b8948');

INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('a4bb73d1-5d1c-4521-b495-5609a50de3f1', 'Utilities', 'c467b1bb-acdc-4b2e-ac7a-50bd6ba36c20');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('91822b84-9348-4469-8255-9fd228967cc7', 'Entertainment', '4017546a-eb18-4912-951d-12912563f60e');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('4a904f7d-411a-4732-8a62-e539ae041b54', 'Office Supplies', '4017546a-eb18-4912-951d-12912563f60e');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('0bfd1640-44ab-4892-b73f-7e42c8cf92d6', 'Office Supplies', '0f3239a6-d549-407e-87a1-587b2379d977');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('b7e155a8-c778-4b15-8975-241ff4ca68f1', 'Utilities', '29b489ed-0be0-4a94-a88d-28ddbf82d7c8');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('068d004b-ea1f-46c7-a840-9e47d81d02e0', 'Travel', 'b59f95f1-2fe5-4bc0-a5f2-adababc8c9e9');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('483abab0-deff-467e-9e5a-43ffea5b3afc', 'Utilities', '4017546a-eb18-4912-951d-12912563f60e');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('21a3cced-4947-48f8-9cc5-df50530e6beb', 'Utilities', '84e82821-6aec-4535-81eb-392e6f83f6cd');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('ea25c502-3f9d-4fb0-b623-dbbf03e8c32e', 'Meals', '2506a867-8c0a-4ac4-83dd-ce7e22768545');
INSERT INTO "tag" ("id", "name", "organizationId") VALUES ('0baa6fcf-d9b7-41d3-9e95-d587a2d4ac9d', 'Meals', '2506a867-8c0a-4ac4-83dd-ce7e22768545');

INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('59c5b4c9-837c-4b3f-8bca-893a79d58ece', 177, 'Team building event', '2024-03-04T01:58:26.751Z', '48882358-d3ff-4583-93fe-a8fd4de92b92', 'b1793a58-e8ab-4d37-aabf-8b1136ed7576');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('2c2d27bc-2d6c-4a27-9ac1-d959f19dc754', 675, 'Software subscription', '2023-10-05T01:10:38.508Z', 'fcf6414c-6218-4398-94c1-2680a3c50246', '1e7a3e66-fc68-49f5-8e97-c771a9329c36');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('1cdfd181-a618-4472-a8a6-c4cc9c1da386', 163, 'Office supplies', '2024-04-19T02:23:23.489Z', 'b9a5376c-787b-41eb-945e-9251a0ee7fea', 'b1793a58-e8ab-4d37-aabf-8b1136ed7576');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('0ca063c9-1423-4d25-9a39-c0d295a6b946', 31, 'Software subscription', '2024-10-22T14:56:21.727Z', '48882358-d3ff-4583-93fe-a8fd4de92b92', '15685b3d-3f73-45c2-8dc9-226db3432894');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('5169fdbf-d318-4200-9f0f-25882e153247', 221, 'Team building event', '2024-08-28T21:22:35.943Z', '48882358-d3ff-4583-93fe-a8fd4de92b92', '8f260144-750e-4163-a7a4-6b46305b8d6d');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('5124f527-c2d5-43ef-a9f2-098d7f25be4f', 705, 'Software subscription', '2023-07-25T01:51:10.622Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'f240a8a4-54e2-4c4c-a849-4d70c4991b24');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('01ef90ad-439f-4aee-9349-449dd03c3673', 310, 'Team building event', '2024-07-25T04:56:36.155Z', 'b9a5376c-787b-41eb-945e-9251a0ee7fea', '1e7a3e66-fc68-49f5-8e97-c771a9329c36');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('edae3c5a-e84e-4973-bdec-ae66926e8f88', 883, 'Software subscription', '2024-06-06T02:26:02.697Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'b1793a58-e8ab-4d37-aabf-8b1136ed7576');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('585e156e-444f-4f26-ae01-b13b40aed9d2', 275, 'Team building event', '2025-05-20T00:15:01.390Z', '4e35dd3f-a6ed-433c-9a0b-7925570fb917', 'd897a29a-8a86-44c9-b009-92a3e7077b50');
INSERT INTO "expense" ("id", "amount", "description", "date", "userId", "projectId") VALUES ('db17991a-e1a8-415c-846a-d31547456af0', 623, 'Travel expenses', '2024-09-01T05:08:20.451Z', '64a7da0e-cfd7-4d07-b959-8d021299313b', '0c1c1cd5-f6d1-4663-bb99-56593c74175c');

INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('54c45c3f-80e0-44cd-a233-4446609c07e8', '1cdfd181-a618-4472-a8a6-c4cc9c1da386', '21a3cced-4947-48f8-9cc5-df50530e6beb');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('ef37dfa2-25da-4f58-be12-3d3e5bcb4e90', '5124f527-c2d5-43ef-a9f2-098d7f25be4f', 'b7e155a8-c778-4b15-8975-241ff4ca68f1');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('31322d12-ce6a-44b3-a638-cf29a790cdcd', '2c2d27bc-2d6c-4a27-9ac1-d959f19dc754', '483abab0-deff-467e-9e5a-43ffea5b3afc');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('a6a4d07c-12fe-429b-8d51-6a330cea07a6', '59c5b4c9-837c-4b3f-8bca-893a79d58ece', 'b7e155a8-c778-4b15-8975-241ff4ca68f1');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('c941bf6c-791f-4040-9470-9f04fdeab0d1', '0ca063c9-1423-4d25-9a39-c0d295a6b946', '91822b84-9348-4469-8255-9fd228967cc7');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('3468a0b3-6333-453f-94b2-a1baf3945854', '1cdfd181-a618-4472-a8a6-c4cc9c1da386', '0baa6fcf-d9b7-41d3-9e95-d587a2d4ac9d');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('757bae10-0f47-41b1-b086-0ff5f93999a1', '5169fdbf-d318-4200-9f0f-25882e153247', 'b7e155a8-c778-4b15-8975-241ff4ca68f1');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('6a44819c-0200-4ee1-b224-a743e82889e5', '59c5b4c9-837c-4b3f-8bca-893a79d58ece', '483abab0-deff-467e-9e5a-43ffea5b3afc');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('6f47b981-356d-480d-b5d0-c89eb144db13', '5124f527-c2d5-43ef-a9f2-098d7f25be4f', '0bfd1640-44ab-4892-b73f-7e42c8cf92d6');
INSERT INTO "expense_tag" ("id", "expenseId", "tagId") VALUES ('a9191185-15c7-4c06-8785-9e31145c00c7', '1cdfd181-a618-4472-a8a6-c4cc9c1da386', '21a3cced-4947-48f8-9cc5-df50530e6beb');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
