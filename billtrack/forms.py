from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateField, FloatField, BooleanField, IntegerField
from wtforms.validators import DataRequired
from wtforms import ValidationError

class BillForm(FlaskForm):
    invoice_number = StringField('Invoice Number', validators=[DataRequired()])
    supplier_name = StringField('Supplier Name', validators=[DataRequired()])
    bill_total = FloatField('Bill total', validators=[DataRequired()])
    bill_paid_status = BooleanField('Bill Paid')
    submit = SubmitField('Add bill')

class ProductForm(FlaskForm):
    product_name = StringField('Product Name', validators=[DataRequired()])
    product_pack = StringField('Product pack', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    free_quantity = IntegerField('Free quantity')
    mrp = FloatField('MRP', validators=[DataRequired()])
    rate = FloatField('Rate', validators=[DataRequired()])
    submit = SubmitField('Add product')