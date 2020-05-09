from billtrack import db
from datetime import datetime

class Bill(db.Model):

    __tablename__ = 'bill'

    id = db.Column(db.Integer, primary_key=True)
    invoice_number = db.Column(db.Text, unique=True, nullable=False)
    supplier_name = db.Column(db.Text, nullable=False)
    bill_total = db.Column(db.Float, nullable=False)
    bill_paid_status = db.Column(db.Boolean, default=False)
   