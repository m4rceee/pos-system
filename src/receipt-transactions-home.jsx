import React from 'react';
import "./styles.css";

const styles = {
  container: {
    width: '500px',
    height: 'auto',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    padding: '10px',
  },
  header: {
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  offReceipt: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  content: {
    fontSize: '13px',
  },

  table: {
    width: '100%',
  },

  tableQty: {
    width: '10%',
  },
  tableDesc: {
    width: '65%',
  },
  tableAmount: {
    width: '25%',
    textAlign: 'right',
  },

};

const Receipt = React.forwardRef(({ transactionData }, ref) => {
  return (
      <div style={styles.container} ref={ref}>
          <div style={styles.header}>Melyson Enterprise</div>
          <p style={styles.offReceipt}>OFFICIAL RECEIPT</p>
          <span className='receiptDivider'></span>
          
          {/* Use map to create <table> based on the length of productBreakdown */}
        <table className='receiptTable'>
          <tbody>
            <tr>
              <td style={styles.tableQty}>Qty</td>
              <td style={styles.tableDesc}>Description</td>
              <td style={styles.tableAmount}>Amount PHP</td>
            </tr>
            <tr><td colSpan={3}><span className='receiptDivider'></span></td></tr>
            {transactionData?.productBreakdown && transactionData.productBreakdown.map((product, index) => (
              <tr key={index}>
                <td>{product.itemQuantity}</td>
                <td>{product.itemName} @{product.itemPrice}</td>
                <td style={styles.tableAmount}>₱{product.itemQuantity * product.itemPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <span className='receiptDivider last'></span>
          
          {transactionData && (
              <>
                  <p style={styles.content}>Transaction Date: {transactionData.dateTransaction}</p>
                  <p style={styles.content}>Reference ID: {transactionData.referenceId}</p>
                  <p style={styles.content}>Total Amount: ₱{transactionData.totalAmount.toFixed(2)}</p>
                  <p style={styles.content}>Cash: ₱{transactionData.totalAmount.toFixed(2)}</p>
                  <p style={styles.content}>Change: ₱{transactionData.totalAmount.toFixed(2)}</p>
              </>
          )}
      </div>
  );
});

export default Receipt;