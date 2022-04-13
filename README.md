This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
```

After the dependencies have successfully installed, run the development server:

```bash
npm run dev
```

Once the server is successfully started, go to [http://localhost:3900](http://localhost:3900) in your browser to view the app.

## Commit Emoji Legend

- 🔨build: Build related changes (eg: npm related/ adding external dependencies)
- 🧹chore: A code change that external user won't see (eg: change to .gitignore file or .prettierrc file)
- ✨feat: A new feature
- 🐛fix: A bug fix
- 📜docs: Documentation related changes
- 👷‍♂️refactor: A code that neither fixes a bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name or general cleanup of the code)
- 🏃🏻‍♀️perf: A code that improves performance
- 💄style: A code that is related to styling
- 🧪test: Adding new test or making changes to existing test
- 🖊content: Adding/Updating content, language keys, or link href’s
- 🧮calc: calculation related changes
- ♿508: Code that improves 508/Accessibility
- 📊GA: Code that integrates/updates Google Analytics

## Automation end to end scenario testing

- Location of page testing cypress\integration\functional
- Location of excel end to end scenarios testing cypress\integration\ExcelTest
- Excel file location to edit for test IncomeExcel.spec.js cypress\fixtures\excelData.xlsx
- JSON file generated after each run to read the excel file cypress\fixtures\xlsxData.json (the JSON file will display all the values from the excel file.)

## Learn More

#### Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

#### Tailwind

To learn more about Tailwind, take a look at the following resources:

- [Tailwind Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.

#### Serverless Framework

To learn more about the Serverless Framework, take a look at the following resources:

- [Serverless Framework Documentation](https://www.serverless.com/) - learn about Serverless Framework features and API.

#### AWS

To learn more about AWS, take a look at the following resources:

##### S3 (Simple Storage Service)

- [S3 - User Guide ](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) - learn about S3.

##### Cloud Formation

- [CloudFormation - User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) - learn about Cloud Formation.
