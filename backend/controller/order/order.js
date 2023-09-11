const loadInfo = (data) => `
    <h3>Hi ${data.name}</h3>
    <h3>Address: ${data.address}</h3>
    <h3>Phone: ${data.phone}</h3>

    <table border="1" style="text-align: center;">
      <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Cost</th>
      </tr>
      ${data.products.map((value) => {
        return `<tr>
        <td>${value.name}</td>
        <td><img width="80" height="80" src="${value.photos[0]}" /></td>
        <td><span>${new Intl.NumberFormat("en-DE").format(
          value.price,
        )} VND</span></td>
        <td><span>${value.quantity}</span></td>

        <td><span>${new Intl.NumberFormat("en-DE").format(
          value.price * value.quantity,
        )} VND</span></td>
      </tr>`;
      })}
      
      
    </table>
    <h2>Total: <span>${new Intl.NumberFormat("en-DE").format(
      data.totalPrice,
    )} VND </span> </h2>
    <h1>Thanks</h1>
`;

module.exports = loadInfo;
