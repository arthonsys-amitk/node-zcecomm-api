# Collections and the object properties of collection entities in the ZCEComm mongodb

<table border="1">
  <tr>
    <th>Collection</th>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td colspan="2">products</td>
    <td>product information</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>name</td>
    <td>every product must have a name</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>description</td>
    <td>product description</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>image</td>
    <td>product image</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>downloadable</td>
    <td>Boolean - whether this is a downloadable product or not</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>URL</td>
    <td>product url (for downloadable products)</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>version</td>
    <td>product version (can be NULL for un-versioned products)</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>licenseDays</td>
    <td>number of days licenses last</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>licenseWeeks</td>
    <td>number of weeks licenses last</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>licenseMonths</td>
    <td>number of months licenses last</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>licenseYears</td>
    <td>number of years licenses last</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>frequency</td>
    <td>frequency of billing measured in months</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>notificationEmail</td>
    <td>list of email addresses to notify when this product is purchased</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>lostLicenseHelp</td>
    <td>Text to show for lost license help in emails</td>
  </tr>
  <tr>
    <td>installationText</td>
    <td>Installation instructions in email when this product is purchased</td>
  </tr>

  <tr>
    <td colspan="2">purchases</td>
    <td>purchase information</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>firstName</td>
    <td>every purchase must have a person's name</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>lastName</td>
    <td>every purchase must have a person's name</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>company</td>
    <td>person's company</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>email</td>
    <td>every purchase must have an email address</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>street1</td>
    <td>every purchase must have a street address</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>street2</td>
    <td>street address line 2</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>city</td>
    <td>every purchase must have a city</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>state</td>
    <td>every purchase must have a state</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>postalCode</td>
    <td>every purchase must have a postal code</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>country</td>
    <td>every purchase must have a country</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>paymentType</td>
    <td>every purchase has a payment type - cc, paypal</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>ccNum</td>
    <td>Credit Card Number used for purchase</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>ccExpMonth</td>
    <td>Credit Card expiration month</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>ccExpYear</td>
    <td>Credit Card expiration year</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>ccType</td>
    <td>Credit Card Type</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>cart</td>
    <td>Shopping cart</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2">
      <table>
        <tr>
          <td>productID</td>
          <td>ID of product purchased</td>
        </tr>
        <tr>
          <td>quantity</td>
          <td>Quantity of product purchased</td>
        </tr>
        <tr>
          <td>activations</td>
          <td>Number of activations</td>
        </tr>
        <tr>
          <td>productKey</td>
          <td>Every purchase has a product key</td>
        </tr>
        <tr>
          <td>productKeyExpiration</td>
          <td>product key expiration</td>
        </tr>
        <tr>
          <td>transactionID</td>
          <td>The payment gateway subscription ID or transaction ID</td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td colspan="2">users</td>
    <td>user information - users are administrators</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>email</td>
    <td>every user must have an email address (also used as username)</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>password</td>
    <td>every user has a password stored as a hash</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>role</td>
    <td>user role - admin or user</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>activeYN</td>
    <td>Boolean flag whether the user is active or not</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>resetKey</td>
    <td>used for password resets - default value is null</td>
  </tr>
  <tr>
    <td colspan="2">activations</td>
    <td>activation log</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>productKey</td>
    <td>product key being activated</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>machineCode</td>
    <td>every activation includes a unique machine code</td>
  </tr>
</table>
