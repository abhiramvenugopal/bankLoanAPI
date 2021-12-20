# bankLoanAPI

LEND,PAYMENT,LEDGER,ACCOUNT OVERVIEW API completed


Additional functionality i would like to add
1.Details of diiferenet types loans that are available will be provided through one API (it should contain a unique key for each loan type).\n
so if we wants to apply for a loan no need to mention rate of intrest just add unique key of that loan to the request.

steps to be followed to excute the program

1. npm install
2 npm start or npm run watch (for start running application)

by default it will run on port 8086
if you wants to change the port you can specify that port in .env file

API info
1.create bank account
URL:http://localhost:8086/api/v1/account/create
method: POST
sample request body:{
                          "name":"abhiramvenu",
                          "email":"abhiramvenu@gmail.com",
                          "phone":"9567860669",
                          "address":{
                              "streetAddress":"pulikkalHouse",
                              "state":"kerala",
                              "district":"thrissur",
                              "pincode":680566 
                          }
                      }
2. LEND
URL: http://localhost:8086/api/v1/loan/lend
method: POST
sample request body: {
                        "accountNumber":"BA1",
                        "loanAmount":460000,
                        "loanPeriod":18,
                        "rateOfIntrest":11
                    }
3. PAYMENT
URL: http://localhost:8086/api/v1/loan/payment
method: PATCH
sample request body: {
                          "loanId":"LN7",
                          "amount":23834
                      }
4. LEDGER
URL: http://localhost:8086/api/v1/loan/ledger?loanId=<loanID>
method: GET

5. ACCOUNT OVERVIEW
URL: http://localhost:8086/api/v1/account/overview?accountNumber=<accountNumber>
method: GET



-Known Bugs
LoanID and account number are created from continous series . so there is a chance to miss the continuity if some request fails.
