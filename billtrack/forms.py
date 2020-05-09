from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateField, FloatField, BooleanField, IntegerField
from wtforms.validators import DataRequired
from wtforms import ValidationError

class BillForm(FlaskForm):
    invoice_number = StringField('Invoice Number', validators=[DataRequired()])
    supplier_name = StringField('Supplier Name', validators=[DataRequired()])
    bill_total = FloatField('Bill total', validators=[DataRequired()])
    bill_paid_status = BooleanField('Bill Paid', validators=[DataRequired()])
    submit = SubmitField('Add bill')
