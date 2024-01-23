import React from 'react';

const styles = {
  container: {
    width: 'auto',
    height: 'auto',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    padding: '10px',
  },
  header: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  content: {
    fontSize: '12px',
    marginBottom: '10px',
  },
};

const Receipt = React.forwardRef(({ transactionData }, ref) => {
  return (
      <div style={styles.container} ref={ref}>
          <div style={styles.header}>Transaction Details</div>
          
          {/* Use map to create <div> elements based on the length of transactionData */}
          <table>
          {transactionData && (          
                <tr>
                  <td>{transactionData.itemQuantity}</td>
                  <td>{transactionData.itemName}</td>
                  <td>{transactionData.itemPrice}</td>
                </tr> 
          )}
          </table>
          
          {transactionData && (
              <>
                  <div style={styles.content}>Transaction Date: {transactionData.dateTransaction}</div>
                  <div style={styles.content}>Transaction ID: {transactionData.referenceId}</div>
                  <div style={styles.content}>Grand Amount: {transactionData.totalAmount}</div>
              </>
          )}
      </div>
  );
});

export default Receipt;