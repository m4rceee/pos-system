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
                <td style={styles.tableAmount}>₱{parseInt(product.itemQuantity * product.itemPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <span className='receiptDivider last'></span>
          
          {transactionData && (
              <div className='receiptDetails'>
                <table className='receiptTable transaction'>
                  <tr>
                    <td><p>Amount Due:</p></td>
                    <td><p>₱{transactionData.totalAmount.toFixed(2)}</p></td>
                  </tr>
                  <tr>
                    <td><p>Cash:</p></td>
                    <td><p>₱{parseInt(transactionData.totalCash, 10).toFixed(2)}</p></td>
                  </tr>
                  <tr>
                    <td><p>Change:</p></td>
                    <td><p>₱{transactionData.totalChange.toFixed(2)}</p></td>
                  </tr>
                </table>
                  <span className='receiptDivider'></span>
                  <p>Transaction Date: {transactionData.dateTransaction}</p>
                  <p>Reference ID: {transactionData.referenceId}</p>
              </div>
          )}
      </div>
  );
});

export default Receipt;