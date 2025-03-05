import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';


const BASE_URL = 'http://localhost:3000'


export const useProductStore = create((set, get) => ({


  products: [],
  loading: false,
  error:null,

  currentProduct: null,


  formData: {
    name: "",
    price: "",
    image: "",

  },
  
  setFormData: (formData) => set({formData}),
  resetFormData: () => set({formData: {name: "", price: "", image: ""}}),

  fetchProducts: async () => {
    set({loading:true})
    try {
      const response = await axios.get(`${BASE_URL}/api/products`)    
      set({products:response.data.data, error:null})
    } catch (error) {
      if (error.status === 429) {
        set({error:"Rate limit exceeded", products:[]});
    }
        else set({error:"Something went wrong"})
    } finally {
      set({loading:false})
    }
  },

  
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },


  addProduct: async (e) => {
    e.preventDefault();
    set({loading: true});
    try {
      const {formData} = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetFormData();
      toast.success("Product added successfully");
      document.getElementById('add_product_modal').close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({loading: false});
    }
  },


  fetchProduct: async (id) => {
    set({loading: true});
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({currentProduct: response.data.data, formData: response.data.data, error: null});
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({error: "Something went wrong", currentProduct: null});
    } finally {
      set({loading: false})
    }
  },


  updateProduct: async (id) => {
    set({loading: true});
    try {
      const {formData} = get();
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      set({currentProduct: response.data.data, error: null});
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateProduct function", error);
    } finally {
      set({loading: false});
    }
  },
}));

