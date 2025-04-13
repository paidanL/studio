import sqlite3
from datetime import datetime

DATABASE_FILE = 'transactions.db'

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect(DATABASE_FILE)
    except sqlite3.Error as e:
        print(e)
    return conn

def create_table():
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT
        )
    ''')
    conn.commit()
    conn.close()

def create_transaction(amount, date, type, description=None):
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO transactions (amount, date, type, description)
            VALUES (?, ?, ?, ?)
        ''', (amount, date.isoformat(), type, description))
        conn.commit()
        transaction_id = cursor.lastrowid
        conn.close()
        return transaction_id if transaction_id else None
    except sqlite3.Error as e:
      print(f"Error inserting transaction: {e}")
      return None

def get_transaction(transaction_id):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM transactions WHERE id = ?
    ''', (transaction_id,))
    transaction = cursor.fetchone()
    conn.close()
    if transaction:
      return {
        "id": transaction[0],
        "amount": transaction[1],
        "date": datetime.fromisoformat(transaction[2]),
        "type": transaction[3],
        "description": transaction[4]
      }
    return None
    

def get_all_transactions():
  conn = create_connection()
  cursor = conn.cursor()
  cursor.execute('''
      SELECT * FROM transactions
  ''')
  transactions = cursor.fetchall()
  conn.close()
  result = []
  for transaction in transactions:
      result.append({
          "id": transaction[0],
          "amount": transaction[1],
          "date": datetime.fromisoformat(transaction[2]),
          "type": transaction[3],
          "description": transaction[4]
      })
  return result

def update_transaction(transaction_id, amount, date, type, description=None):
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            UPDATE transactions SET amount = ?, date = ?, type = ?, description = ?
            WHERE id = ?
        ''', (amount, date.isoformat(), type, description, transaction_id))
        conn.commit()
        conn.close()
        return True
    except sqlite3.Error as e:
      print(f"Error updating transaction: {e}")
      return False

def delete_transaction(transaction_id):
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            DELETE FROM transactions WHERE id = ?
        ''', (transaction_id,))
        conn.commit()
        conn.close()
        return True
    except sqlite3.Error as e:
      print(f"Error deleting transaction: {e}")
      return False

create_table()