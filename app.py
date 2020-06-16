import os
import datetime
from flask import render_template, redirect, url_for
from billtrack import app, db
from billtrack.models import Bill, Product
from billtrack.forms import BillForm, ProductForm, SearchForm

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/all_bills', methods=['POST', 'GET'])
def all_bills():
    bills = Bill.query.all()
    form = SearchForm()
    bills = Bill.query.order_by(Bill.bill_date.desc()).all()
    if form.validate_on_submit():
        bills = Bill.query.filter(Bill.supplier_name.like(f"%{form.search_text.data}%")).filter_by(bill_paid_status=form.paid_check.data).order_by(Bill.bill_date.desc()).all()
    return render_template('all_bills.html',form=form, bills=bills)

@app.route('/add_bill', methods=['POST', 'GET'])
def add_bill():
    form = BillForm()
    if form.validate_on_submit():
        bill = Bill.query.filter_by(invoice_number=form.invoice_number.data).first()
        if bill:
            return render_template('bill_exists.html',invoice_number=form.invoice_number.data)
        d, m, y = form.bill_date.data.split('/')
        date = datetime.datetime(int(y), int(m), int(d))
        bill = Bill(invoice_number=form.invoice_number.data,
                    supplier_name=form.supplier_name.data,
                    bill_total=form.bill_total.data,
                    bill_paid_status=form.bill_paid_status.data,
                    bill_date = date)
        db.session.add(bill)
        db.session.commit()
        return redirect(url_for('bill_details',invoice_number=form.invoice_number.data))
    return render_template('add_bill.html', form=form)

@app.route('/bill/<invoice_number>')
def bill_details(invoice_number):
    bill = Bill.query.filter_by(invoice_number=invoice_number).first_or_404()
    products = Product.query.filter_by(bill_id=bill.id).all()
    return render_template('bill_details.html', bill=bill, products=products)

@app.route('/bill/<invoice_number>/editbill', methods=['GET', 'POST'])
def mark_as_paid(invoice_number):
    bill = Bill.query.filter_by(invoice_number=invoice_number).first_or_404()
    bill.bill_paid_status = True
    db.session.commit()
    return redirect(url_for('bill_details', invoice_number=invoice_number))

@app.route('/bill/<invoice_number>/deletebill', methods=['GET', 'POST'])
def delete_bill(invoice_number):
    bill = Bill.query.filter_by(invoice_number=invoice_number).first_or_404()
    db.session.delete(bill)
    db.session.commit()
    return redirect(url_for('all_bills'))

@app.route('/bill/<invoice_number>/add_product', methods=['GET', 'POST'])
def add_product(invoice_number):
    form = ProductForm()
    if form.validate_on_submit():
        bill = Bill.query.filter_by(invoice_number=invoice_number).first()
        product = Product(bill_id=bill.id,
                        product_name=form.product_name.data,
                        product_pack=form.product_pack.data,
                        quantity=form.quantity.data,
                        free_quantity=form.free_quantity.data,
                        mrp=form.mrp.data,
                        rate=form.rate.data)
        db.session.add(product)
        db.session.commit()
        return redirect(url_for('bill_details', invoice_number=invoice_number))
    return render_template('add_product.html', form=form, invoice_number=invoice_number)


if __name__ == "__main__":
    if not os.path.exists("billtrack/data.db"):
        os.system('flask db init')
        os.system('flask db migrate')
        os.system('flask db upgrade')
    app.run(debug=True)