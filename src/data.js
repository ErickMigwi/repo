import React, { useState } from 'react';
import axios from 'axios';

export async function getProducts() {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}