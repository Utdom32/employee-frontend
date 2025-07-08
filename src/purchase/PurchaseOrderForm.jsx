import React, { useState, useEffect } from 'react';

const PurchaseOrderForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    supplier: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDeliveryDate: '',
    notes: '',
    items: [{
      product: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 10,
      discountRate: 0,
      notes: ''
    }]
  });

  // Fetch suppliers and products on component mount
  useEffect(() => {
    // In a real app, you would fetch these from your API
    const fetchData = async () => {
      // Mock data - replace with actual API calls
      setSuppliers([
        { _id: '1', name: 'ABC Suppliers' },
        { _id: '2', name: 'XYZ Distributors' }
      ]);
      
      setProducts([
        { _id: '101', name: 'Premium Widget', price: 49.99 },
        { _id: '102', name: 'Standard Widget', price: 29.99 }
      ]);
    };
    
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [name]: name === 'product' ? value : Number(value)
    };
    
    // Update unit price if product changes
    if (name === 'product') {
      const selectedProduct = products.find(p => p._id === value);
      if (selectedProduct) {
        newItems[index].unitPrice = selectedProduct.price;
      }
    }
    
    setFormData({
      ...formData,
      items: newItems
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          product: '',
          quantity: 1,
          unitPrice: 0,
          taxRate: 10,
          discountRate: 0,
          notes: ''
        }
      ]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems
    });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice * (1 - item.discountRate / 100)), 
      0
    );
    
    const taxAmount = formData.items.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice * (1 - item.discountRate / 100) * (item.taxRate / 100)), 
      0
    );
    
    return {
      subtotal: subtotal.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      totalAmount: (subtotal + taxAmount).toFixed(2)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totals = calculateTotals();
    
    const poData = {
      ...formData,
      subtotal: parseFloat(totals.subtotal),
      taxAmount: parseFloat(totals.taxAmount),
      totalAmount: parseFloat(totals.totalAmount),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, you would send this to your backend API
    console.log('Submitting PO:', poData);
    // await fetch('/api/purchase-orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(poData)
    // });
    
    alert('Purchase Order submitted successfully!');
  };

  const totals = calculateTotals();

  return (
    <div className="container">
      <h2>Create Purchase Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Supplier</label>
          <select
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Order Date</label>
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Expected Delivery Date</label>
            <input
              type="date"
              name="expectedDeliveryDate"
              value={formData.expectedDeliveryDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <h3>Items</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="form-row">
              <div className="form-group">
                <label>Product</label>
                <select
                  name="product"
                  value={item.product}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product._id} value={product._id}>
                      {product.name} (${product.price})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Unit Price</label>
                <input
                  type="number"
                  name="unitPrice"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tax Rate (%)</label>
                <input
                  type="number"
                  name="taxRate"
                  min="0"
                  max="100"
                  value={item.taxRate}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="form-group">
                <label>Discount Rate (%)</label>
                <input
                  type="number"
                  name="discountRate"
                  min="0"
                  max="100"
                  value={item.discountRate}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Notes</label>
              <input
                type="text"
                name="notes"
                value={item.notes}
                onChange={(e) => handleItemChange(index, e)}
              />
            </div>
            
            {formData.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="remove-btn"
              >
                Remove Item
              </button>
            )}
            <hr />
          </div>
        ))}
        
        <button type="button" onClick={addItem} className="add-btn">
          Add Item
        </button>
        
        <div className="totals-section">
          <h3>Order Totals</h3>
          <p>Subtotal: ${totals.subtotal}</p>
          <p>Tax: ${totals.taxAmount}</p>
          <p>Total: ${totals.totalAmount}</p>
        </div>
        
        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Submit Purchase Order
        </button>
      </form>
    </div>
  );
};

export default PurchaseOrderForm;