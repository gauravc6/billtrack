from billtrack import db
from datetime import datetime

class Bill(db.Model):

    __tablename__ = 'bill'

    id = db.Column(db.Integer, primary_key=True)
    invoice_number = db.Column(db.Text, unique=True, nullable=False)
    supplier_name = db.Column(db.Text, nullable=False)
    bill_total = db.Column(db.Float, nullable=False)
    bill_paid_status = db.Column(db.Boolean, default=False)
    bill_date = db.Column(db.Date, default=datetime.today())

    products = db.relationship('Product', backref='bill', lazy=True)

class Product(db.Model):

    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bill.id'), nullable=False)

    product_name = db.Column(db.Text, nullable=False)
    product_pack = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    free_quantity = db.Column(db.Integer)
    mrp = db.Column(db.Float, nullable=False)
    rate = db.Column(db.Float, nullable=False)
   