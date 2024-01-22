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
        <div style={styles.header}>Melyson Enterprise</div>
        <div style={styles.header}>Melyson Enterprise</div>
        <div style={styles.header}>Melyson Enterprise</div>
        <div style={styles.header}>Melyson Enterprise</div>
        <div style={styles.header}>Melyson Enterprise</div>
        {transactionData && (
          <>
            <div style={styles.content}>Transaction Date: {transactionData.transactionDate}</div>
            <div style={styles.content}>Transaction ID: {transactionData.transactionId}</div>
            <div style={styles.content}>Grand Amount: {transactionData.grandAmount}</div>
          </>
        )}
      </div>
    );
  });

export default Receipt;