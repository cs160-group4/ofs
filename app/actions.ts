"use server";
import { z } from "zod";
import { Product, deleteProduct, insertProduct } from "./lib/products";
import { addAddress, deleteAddress } from "./lib/addresses";
import { createOrder,  getOrdersByUserId } from "./lib/orders";
import { addOrderItem } from "./lib/order_item";
// import { getRobots, updateRobotWithOrder } from "./lib/robots";
import { revalidatePath } from "next/cache";
import { deleteReview } from "./lib/reviews";
import { NewEmail, NewPassword, updateNewEmail, updateNewPassword } from "./lib/users";
import bcrypt, { hash } from 'bcrypt';
import { redirect } from "next/navigation";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export async function createProduct(formData: FormData, url: string) {
  const currentDateTime = new Date();
  const formattedDateTime = formatDate(currentDateTime);
  const priceEx = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d{9})?(\.\d{1,2})?$/gm

  const schema = z.object({
    name: z.string().min(1).max(40),
    description: z.string().min(0).max(100),
    slug: z.string().min(1).max(50).trim().toLowerCase(),
    brand: z.string().min(1).max(30),
    categoryId: z.number().int(),
    picture: z.string().min(0).max(110),
    itemWeight: z.number().positive(),
    itemPrice: z.string().regex(priceEx),
    itemQuantity: z.number().int().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });

  try {
    const result = schema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      slug: formData.get("slug"),
      brand: formData.get("brand"),
      categoryId: Number(formData.get("category_id")),
      picture: url,
      itemWeight: Number(formData.get("itemWeight")),
      itemPrice: formData.get("itemPrice"),
      itemQuantity: Number(formData.get("itemQuantity")),
      createdAt: formattedDateTime,
      updatedAt: formattedDateTime,
    });

    if(result.success)
    {
      await insertProduct(result.data);
      revalidatePath("/");
      return { success: true, message: result.data.name + ' Added Successfully'}
    }
    else{
      return { success: false, message: "Product Failed To Be Added"}
    }
  }
  catch(error) {
    return {success: false, message: "Product Failed To Be Added"}
  }
}

// delete product and all dependent reviews
// may separate into different functions
export async function removeProduct(formData: FormData) {
  try {
    const id = Number(formData.get("id"));
    await deleteProduct(id);
    revalidatePath("/admin/products");
    return { message: "Deleted Product" };
  } catch (error) {
    return {
      message: "Database Error: Failed to Remove Product",
    };
  }
}

// Fariha - 11/03/23
export async function addNewAddress(formData: FormData) {
  const schema = z.object({
    addressLine1: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    addressLine2: z.string(),
    userId: z.string()
  });

  try {
    const newAddress = schema.safeParse({
      addressLine1: formData.get("addressLine1"),
      city: formData.get("city"),
      state: formData.get("state"),
      postalCode: formData.get("postalCode"),
      addressLine2: formData.get("addressLine2"),
      userId: formData.get("userId")
    });

    if(newAddress.success)
    {
      await addAddress(newAddress.data);
      revalidatePath("/profile");
      return { success: true, message: "Address added successfully"}
    }
    else{
      return { success: false, message: "Address failed to be added"}
    }

  } catch (error) {
    return {success: false, err: true, message: "Error: Address failed to be added"}
  }
}

export async function deleteAddressFromDB(formData: FormData) {
  try {
    const id = formData.get("id");
    //await deleteAddress(id);
    revalidatePath("/profile");
    return { message: "Deleted Address" };
  } catch (error) {
  }
  revalidatePath('/cart');
}

// Aaron - 11/07/23
export async function updateEmail(formData: FormData) {
  const schema = z.object({
    newEmail: z.string(),
    confirmEmail: z.string(),
    user_id: z.string()
  });

  try {
    const newEmailForm = schema.safeParse({
      newEmail: formData.get("newEmail"),
      confirmEmail: formData.get("confirmEmail"),
      user_id: formData.get("userId")
    });

    if(newEmailForm.success)
    {
      const data : NewEmail  = newEmailForm.data;
      if (!data.newEmail.includes("@") || !data.confirmEmail.includes("@")) {
        return {
          success: false,
          message: "Error: New Email Does Not Contain @"
        };
      }
      else if (data.newEmail !== data.confirmEmail) {
        return {
          success: false,
          message: "Error: Emails Do Not Match"
        };
      }
      else {
        await updateNewEmail(data);
        revalidatePath("/profile");
        return { success: true, message: "Address updated successfully"}
      }
    }
    else{
      return { success: false, message: "Error: Address failed to be updated"}
    }

  } catch (error) {
    return {success: false, err: true, message: "Error: Address failed to be updated"}
  }
}

export async function updatePassword(formData: FormData) {
  const schema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string(),
    user_id: z.string()
  });

  try {
    const newPasswordForm = schema.safeParse({
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
      user_id: formData.get("userId")
    });

    if(!newPasswordForm.success)
    {
      return { success: false, message: "Error: Password failed to be updated"}
    }
    const {newPassword, confirmPassword, user_id}  = newPasswordForm.data;
    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: "Error: Passwords Do Not Match"
      };
    }
    else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      let newData : NewPassword = {
        user_id: user_id,
        newPassword: hashedPassword,
        confirmPassword: hashedPassword
      } 
      await updateNewPassword(newData);
      revalidatePath("/profile");
      return { success: true, message: "Password updated successfully"}
    }

  } catch (error) {
    return {success: false, err: true, message: "Error: Password failed to be updated"}
  }
}

// Fariha - 11/11/23
export async function createNewOrder(formData: FormData) {
  const priceEx = /^(?:\$?)((?:[1-9]\d{0,2}(,\d{3})*|\d{1,9})(?:\.\d{1,2})?)$/gm;
  
  const schema = z.object({
    totalWeight: z.number().positive(),
    tax: z.string().regex(priceEx),
    subtotal: z.string().regex(priceEx),
    userId: z.string(),
    shippingCost: z.string().regex(priceEx),
    discount: z.string().regex(priceEx),
    grandTotal: z.string().regex(priceEx),
    deliveryStatus: z.string()
  });

  try {
    const order = schema.safeParse({
      totalWeight: Number(formData.get("totalWeight")),
      tax: formData.get("tax"),
      subtotal: formData.get("subtotal"),
      userId: formData.get("userId"),
      shippingCost: formData.get("shippingCost"),
      discount: formData.get("discount"),
      grandTotal: formData.get("grandTotal"),
      deliveryStatus: formData.get("deliveryStatus")
    })
    
    if(order.success){
      await createOrder(order.data);
      return { success: true, message: "Order created successfully" }
    } else {
      return { success: false, message: "Order failed to be created"}
    }
  } catch (error) {
    return {success: false, err: true, message: "Error: Order failed to be added"}
  }
}

export async function getLatestOrderByUserId(formData: FormData){
  try {
    const userId = String(formData.get("userId"));
    const res = await getOrdersByUserId(userId);
    const lastOrderId = res[res.length - 1];
    
    return {success: true, message: "Last Order ID retrieved successfully", data: lastOrderId.id};
  } catch (error) {
    return { success: false, message: "Error: Orders failed to be retrieved" }
  }
}

export async function createOrderItem(formData: FormData){
  const priceEx = /^(?:\$?)((?:[1-9]\d{0,2}(,\d{3})*|\d{1,9})(?:\.\d{1,2})?)$/gm;

  const schema = z.object({
    itemWeight: z.number().positive(),
    productId: z.number().int(),
    quantity: z.number().int().positive(),
    orderId: z.number().int(),
    price: z.string().regex(priceEx)
  });

  try {
    const orderItem = schema.safeParse({
      itemWeight: Number(formData.get("itemWeight")),
      productId: Number(formData.get("productId")),
      quantity: Number(formData.get("quantity")),
      orderId: Number(formData.get("orderId")),
      price: formData.get("price")
    });

    if(orderItem.success){
      await addOrderItem(orderItem.data);
      return { success: true, message: "Order Item created successfully" }
    } else {
      return { success: false, message: "Order Item failed to be created" }
    }
  } catch (error) {
    return { success: false, message: "Error: Order item failed to be created"}
  }
}

// export async function assignOrderToRobot(formData: FormData){
//   try {
//     const orderWeight = Number(formData.get("totalWeight"));
    
//     var robotId = 0;
//     let robot;
//     const robots = await getRobots();
//     for (let i = 0; i < robots.length; i++){
//       robot = robots[i];
//       if (robot.totalOrders === null || robot.totalOrders < 10) {
//         if(robot.totalWeight === null || parseFloat(robot.totalWeight) < 200) {
//           if(robot.totalWeight !== null && parseFloat(robot.totalWeight) + orderWeight <= 200) {
//             robotId = robot.id;
//             break;
//           }     
//         }
//       }   
//     }

//     var updatedTotalOrders = 0;
//     var updatedTotalWeight = 0;

//     if(robot !== null && robot !== undefined){
//       updatedTotalOrders = robot.totalOrders? robot.totalOrders + 1: 1;
//       updatedTotalWeight = robot.totalWeight !== null ? parseFloat(robot.totalWeight) + orderWeight : orderWeight;
   
//       await updateRobotWithOrder(robotId, updatedTotalOrders, String(updatedTotalWeight));
//     }

//     const orderId = Number(formData.get("orderId"));
//     await updateOrderWithRobotId(orderId, robotId);

//     return { success: true, message: "Order updated successfully" }  
//   } catch (error) {
//     return { success: false, message: "Error: order failed to be assigned to a robot"}
//   }
// }