/* eslint-disable */

"use strict";

const sideBar = document.querySelector(".side-bar ul");
const overlay = document.querySelector(".overlay");
const fieldEditor = document.querySelector(".field-editor");

const product = document.getElementById("product");
const productMen = document.getElementById("productMen");
const productWomen = document.getElementById("productWomen");
const productKids = document.getElementById("productKids");
const order = document.getElementById("orders");
const user = document.getElementById("user");

const cookie = window.location.href.split("/").pop();

const getAdmin = async () => {
  const response = await fetch(
    "http://127.0.0.1:5000/api/signup/isUserLoggedIn",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        JWTCookie: cookie,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const adminDetails = data.loggedInUser;

    document.querySelector(
      ".welcome-message"
    ).innerText = `Welcome ${adminDetails.name
      .split(" ")
      .map((nm) => nm[0].toUpperCase() + nm.slice(1))
      .join(" ")} \n to Sole Sneakers Admin Dashboard`;

    document.querySelector(
      ".admin-picture"
    ).src = `http://localhost:5000/assets/profile_pictures/${adminDetails.profilePicture}`;
  }
};

getAdmin();

sideBar.addEventListener("click", function (e) {
  const target = e.target.nodeName;

  if (target !== "LI") return;

  document.querySelectorAll(".side-bar li").forEach((li) => {
    li.classList.remove("active");
  });

  e.target.classList.add("active");
});

// ***********************
// PRODUCT
// ***********************

async function fetchProducts() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/shoes/collections",
      {
        headers: {
          JWTCookie: cookie,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function fetchProductsMen() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/shoes/collections/Men",
      {
        headers: {
          JWTCookie: cookie,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch men products");
    }
    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function fetchProductsWomen() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/shoes/collections/Women",
      {
        headers: {
          JWTCookie: cookie,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch women products");
    }
    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function fetchProductsKids() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/shoes/collections/kids",
      {
        headers: {
          JWTCookie: cookie,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch kids products");
    }
    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function displayProducts(fetchType) {
  try {
    let productsResult;
    if (fetchType == "men") {
      productsResult = await fetchProductsMen();
    } else if (fetchType == "women") {
      productsResult = await fetchProductsWomen();
    } else if (fetchType == "kids") {
      productsResult = await fetchProductsKids();
    } else {
      productsResult = await fetchProducts();
    }

    const products = productsResult.allShoes;

    const tableBody = document.createElement("tbody");
    products.forEach((product) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td style="font-size:16px;">${product._id}</td>
                <td>${product.name}</td>
                <td style="text-transform:capitalize;">${product.category}</td>
                <td><textarea class='text-area' readonly>${product.description}</textarea></td>
                <td>&#x20B9;${product.price}</td>
                <td>${product.ratings}</td>
                <td><img src="http://localhost:5000/assets/images/${product.images}" alt="${product.name} image."/></td>
                <td>${product.Stock}</td>
                <td>
                <button onclick="editProduct('${product._id}')">Edit</button>
                <button onclick="deleteProduct('${product._id}')">Delete</button>
                </td>
                `;
      tableBody.appendChild(row);
    });

    const table = document.createElement("table");
    table.id = "products-table";
    table.innerHTML = `
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Image</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
          `;
    table.appendChild(tableBody);

    const addForm = document.createElement("form");
    addForm.classList.add("new-form");
    addForm.innerHTML = `
      <label for="newProductName">Product Name:</label>
      <input type="text" id="newProductName" placeholder="Enter product name" name="newProductName" required>
      <label for="newProductDescription">Description:</label>
      <textarea  id="newProductDescription" class="extend" placeholder="Enter product description" rows="10" name="newProductDescription" required></textarea>
      <label for="newProductPrice">Price:</label>
      <input type="number" id="newProductPrice" placeholder="Enter price" name="newProductPrice" required>
      <label for="newProductCategory">Category:</label>
      <select id="newProductCategory" name="newProductCategory" required>
        <option value="men" selected>Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>
      <label for="newProductImage">Image:</label>
      <input type="file" class="file-upload extend" id="newProductImage" name="newProductImage" required>
      <label for="newProductRating">Rating:</label>
      <input type="text" id="newProductRating" placeholder="Enter product rating" name="newProductRating" required>
      <label for="newProductStock">Stock:</label>
      <input type="text" id="newProductStock" placeholder="Enter product Stock" name="newProductStock" required>
      <button type="submit">Add Product</button>
    `;
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(addForm);

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/shoes/collections",
          {
            method: "POST",
            headers: {
              JWTCookie: cookie,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add product");
        }
        const data = await response.json();
        alert(data.message);
        if (data.status == "success") {
          displayProducts("all");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product");
      }
    });

    const mainArea = document.querySelector(".main-area");
    mainArea.innerHTML = "";
    mainArea.appendChild(table);
    mainArea.appendChild(addForm);
  } catch (error) {
    console.error("Error displaying products:", error);
  }
}

async function editProduct(productId) {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/shoes/collections/${productId}`,
      {
        headers: {
          JWTCookie: cookie,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const productData = await response.json();

    const product = productData.shoes;

    const formContainer = document.querySelector(".field-editor");

    formContainer.innerHTML = "";

    const form = document.createElement("form");
    form.innerHTML = `
        <label for="productName">Product Name:</label>
  <input type="text" id="productName" name="productName" value="${
    product.name
  }" required>
  
  <label for="description">Description:</label>
  <textarea class="out-line" id="description" name="description" rows="10" required>${
    product.description
  }</textarea>
  
  <label for="productPrice">Price:</label>
  <input type="number" id="productPrice" name="productPrice" value="${
    product.price
  }" required>
  
  <label for="productCategory">Category:</label>
  <select id="productCategory" name="productCategory" required>
    <option value="men" ${
      product.category === "men" ? "selected" : ""
    }>Men</option>
    <option value="women" ${
      product.category === "women" ? "selected" : ""
    }>Women</option>
    <option value="kids" ${
      product.category === "kids" ? "selected" : ""
    }>Kids</option>
  </select>
  
  <label for="productImage">Upload New Image:</label>
  <input type="file" class="file-upload" id="productImage" name="productImage" accept="image/*">
  
  <label for="productRating">Rating:</label>
  <input type="text" id="productRating" name="productRating" value="${
    product.ratings
  }" required>
  
  <label for="productStock">Stock:</label>
  <input type="text" id="productStock" name="productStock" value="${
    product.Stock
  }" required>
  
  <button type="submit">Update</button>
  <button type="reset" id="close">Cancel</button>
    `;

    formContainer.appendChild(form);

    toggleEditWindow();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const updateResponse = await fetch(
        `http://127.0.0.1:5000/api/shoes/collections/${productId}`,
        {
          method: "PATCH",
          headers: {
            JWTCookie: cookie,
          },
          body: formData,
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update product");
      }

      const responseData = await updateResponse.json();

      alert(responseData.message);

      displayProducts(
        document
          .querySelector(".side-bar ul .active")
          .innerText.split(" ")[0]
          .toLowerCase()
      );
    });
  } catch (error) {
    alert("Update failed! try again!");
    console.error("Error editing product:", error);
  }
}

async function deleteProduct(productId) {
  try {
    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmation) return;

    const response = await fetch(
      `http://127.0.0.1:5000/api/shoes/collections/${productId}`,
      {
        method: "DELETE",
        headers: {
          JWTCookie: cookie,
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData.message);
      displayProducts();
    } else {
      const responseData = await response.json();
      if (responseData.error.name == "CastError")
        alert("Product ID is invalid!");
      else {
        alert(`${responseData.error.name}! Please try again`);
      }
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product. Please try again later.");
  }
}

// ***********************
// ORDERS
// ***********************

async function fetchOrders() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/order/getAllOrders",
      {
        headers: {
          JWTCookie: cookie,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const orders = await response.json();

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function displayOrders() {
  try {
    const orders = await fetchOrders();

    if (orders.length === 0) {
      const mainArea = document.querySelector(".main-area");
      mainArea.innerHTML = "<h3>No Orders available.</h3>";
      return;
    }

    const tableBody = document.createElement("tbody");
    orders.data.orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="font-size:16px;">${order._id}</td> 
         <td>
          <textarea style="line-height:1.5;" class='text-area' readonly>ID: ${
            order.user._id
          }\nName: ${order.user.name
        .split(" ")
        .map((nm) => `${nm[0].toUpperCase()}${nm.slice(1)}`)
        .join(" ")}\nEmail: ${order.user.email}\nAddress: ${
        order.user.address
      }</textarea>
        </td>
        <td>
          <textarea style="line-height:1.5;" class='text-area' readonly>${order.items
            .map(
              (item) =>
                `Product ID: ${item.product._id}\nName: ${item.product.name}\nQuantity: ${item.quantity}\n\n---------------------------\n`
            )
            .join("\n")}
          </textarea>
        </td>
        <td>&#x20B9;${order.totalAmount}</td>
        <td>${order.paymentId}</td>
        <td style="font-weight:700; ${
          order.status == "In-Progress"
            ? "background-color:yellow;"
            : "background-color:green; color:#fff;"
        }">${order.status}</td>
        <td>${`${orderDate.getDate()}/${
          orderDate.getMonth() + 1
        }/${orderDate.getFullYear()} | ${orderDate.toLocaleTimeString()}`}</td>
        <td>
  ${
    order.status === "In-Progress"
      ? `<button onclick="changeStatusOrder('${order._id}')">Change status</button>`
      : "N/A"
  }
</td>
      `;
      tableBody.appendChild(row);
    });

    const table = document.createElement("table");
    table.id = "orders-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User ID</th>
          <th>Ordered Products</th>
          <th>Total Amount</th>
          <th>Payment ID</th>
          <th>Status</th>
          <th>Order Date</th>
          <th>Actions</th>
        </tr>
      </thead>
    `;
    table.appendChild(tableBody);

    const mainArea = document.querySelector(".main-area");
    mainArea.innerHTML = "";
    mainArea.appendChild(table);
  } catch (error) {
    console.error("Error displaying orders:", error);
  }
}

async function changeStatusOrder(orderId) {
  try {
    const confirmUpdate = confirm(
      "Are you sure you want to mark this order as 'Delivered'?"
    );

    if (!confirmUpdate) {
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:5000/api/order/changeStatus/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          JWTCookie: cookie,
        },
        body: JSON.stringify({ status: "Delivered" }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    const updatedOrder = await response.json();

    displayOrders();
  } catch (error) {
    console.error("Error updating order status:", error);
  }
}

// ***********************
// USERS
// ***********************

async function fetchUsers() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/admin-panel/getAllUsers",
      {
        headers: {
          JWTCookie: cookie,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function displayUsers() {
  try {
    const users = await fetchUsers();

    const tableBody = document.createElement("tbody");
    users.data.users.forEach((user) => {
      const row = document.createElement("tr");
      const createdAt = new Date(user.createdAt);
      row.innerHTML = `
                  <td style="font-size:16px;">${user._id}</td>
                  <td>${user.name
                    .split(" ")
                    .map((nm) => `${nm[0].toUpperCase()}${nm.slice(1)}`)
                    .join(" ")}</td>
                  <td>${user.email}</td>
                  <td>${user.address}</td>
                  <td>${
                    user.profilePicture
                      ? '<img src="http://localhost:5000/assets/profile_pictures/' +
                        user.profilePicture +
                        '" alt="Profile Picture" width="50" height="50"/>'
                      : "N/A"
                  }</td>
                  <td style="${
                    user.role == "admin"
                      ? "background-color:green; color: #fff;"
                      : ""
                  }">${user.role.toUpperCase()}</td>
                  <td>${`${createdAt.getDate()}/${
                    createdAt.getMonth() + 1
                  }/${createdAt.getFullYear()} | ${createdAt.toLocaleTimeString()}`}</td>
                `;
      tableBody.appendChild(row);
    });

    const table = document.createElement("table");
    table.id = "users-table";
    table.innerHTML = `
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Profile Picture</th>
                  <th>Role</th>
                  <th>Created At</th>
                </tr>
              </thead>
            `;
    table.appendChild(tableBody);

    const mainArea = document.querySelector(".main-area");
    mainArea.innerHTML = "";
    mainArea.appendChild(table);
  } catch (error) {
    console.error("Error displaying users:", error);
  }
}

product.addEventListener("click", displayProducts.bind(this, "all"));
productMen.addEventListener("click", displayProducts.bind(this, "men"));
productWomen.addEventListener("click", displayProducts.bind(this, "women"));
productKids.addEventListener("click", displayProducts.bind(this, "kids"));
order.addEventListener("click", displayOrders);
user.addEventListener("click", displayUsers);

const toggleEditWindow = () => {
  overlay.classList.toggle("active");
  fieldEditor.classList.toggle("active");
};

document.addEventListener("click", function (e) {
  const id = e.target.getAttribute("id");

  if (id == "close") {
    toggleEditWindow();
  }
});
