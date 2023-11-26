<h1>Expense Tracker App</h1>

<h3>Overview</h3>
The Expense Tracker App is a user-friendly and intuitive tool designed to help you manage and track your expenses
effortlessly. Whether you're a budget-conscious individual, a small business owner, or someone looking to gain better
control over their finances, this app is tailored to meet your needs.

<h3>Key Features</h3>
<h5>Easy Expense Entry:</h5>
<p>Quickly add your expenses with a simple and streamlined interface. Categorize transactions for better organization.</p>

<h5>Expense History:</h5>
<p>View a detailed history of your past expenses.</p>


<h3>Installation:</h3>

<lt>
<li>Install Java 17 and set up JAVA_HOME <a href="https://www.java.com/en/download/help/download_options.html">Java guide</a> </li>
<li>Install maven <a href="https://maven.apache.org/install.html">Maven install guide</a></li> 
<li>Add Java and Maven to $PATH</li>
<li>Clone the repository to your local machine</li>
<li>Go to project dir</li>
<li>Run command: mvn clean package</li>
<li>Run command: java -jar target/expense-traker-0.0.1-SNAPSHOT.jar</li>
<li>Go to browser: <a href="http://localhost:8080/">http://localhost:8080/</a></li>
</lt>

<h3>Technologies Used</h3>
<h5>Frontend:</h5>
<li>React.js</li>

<h5>Backend:<h5>

<li>Java 11</li>
<li>Spring Boot 3</li>
<li>H2</li>

<h3>Test cases:<h3>

<h5>Check all categories listed at UI Categories tab<h5>
<li>Go to categories tab</li>
<li>Count categories</li>
<li>Go to H2 database and count categories</li>
<li>Expected: categories at database should be equal to categories at UI</li>

<h5>Check category created<h5>
<li>Go to categories tab</li>
<li>Click add button</li>
<li>Fill fields</li>
<li>Click save button</li>
<li>Expected: new category should appear at UI category tab</li>

<h5>Check category removed<h5>
<li>Go to categories tab</li>
<li>Create new category</li>
<li>Click remove button</li>
<li>Expected: removed category should disappear from UI category part</li>

<h5>Check all transaction histories listed at UI Categories tab<h5>
<li>Go to transaction history tab</li>
<li>Count all transactions</li>
<li>Go to H2 database and count all transactions</li>
<li>Expected: transactions at database should be equal to transactions at UI</li>

<h5>Check transaction history created<h5>
<li>Go to transaction history tab</li>
<li>Click add button</li>
<li>Fill fields</li>
<li>Click save button</li>
<li>Expected: new transaction history should appear at UI category tab by specific date</li>

<h5>Check transaction history removed<h5>
<li>Go to transaction history tab</li>
<li>Create new transaction history</li>
<li>Click remove button under specific category</li>
<li>Expected: removed category should disappear from UI category part</li>