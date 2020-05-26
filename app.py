import os
import datetime
from flask import render_template, redirect, url_for, jsonify, request
import json
from billtrack import app, db
from billtrack.models import Bill, Product
from billtrack.forms import BillForm, ProductForm

savedAutomaticNightLight = 1
savedAutomaticDayNightMode = 1
savedIsNightLightActive = 0
savedIsNightModeActive = 0

@app.route('/')
def index():
    return render_template('index.html', savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive)

@app.route('/allbills')
def allbills():
    bills = Bill.query.all()
    return render_template('all_bills.html', bills=bills, savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive)

@app.route('/addbill', methods=['POST', 'GET'])
def addbill():
    form = BillForm()
    if form.validate_on_submit():
        bill = Bill.query.filter_by(invoice_number=form.invoice_number.data).first()
        if bill:
            return render_template('bill_exists.html',invoice_number=form.invoice_number.data, savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive)
        d, m, y = form.bill_date.data.split('/')
        date = datetime.datetime(int(y), int(m), int(d))
        bill = Bill(invoice_number=form.invoice_number.data,
                    supplier_name=form.supplier_name.data,
                    bill_total=form.bill_total.data,
                    bill_paid_status=form.bill_paid_status.data,
                    bill_date = date)
        db.session.add(bill)
        db.session.commit()
        return redirect(url_for('bill_details',invoice_number=form.invoice_number.data, savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive))
    return render_template('add_bill.html', form=form, savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive)

@app.route('/bill/<invoice_number>')
def bill_details(invoice_number):
    bill = Bill.query.filter_by(invoice_number=invoice_number).first_or_404()
    products = Product.query.filter_by(bill_id=bill.id).all()
    return render_template('bill_details.html', bill=bill, products=products, savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive)

@app.route('/bill/<invoice_number>/editbill', methods=['GET', 'POST'])
def editbill(invoice_number):
    # TODO: Complete edit bill route
    pass

@app.route('/bill/<invoice_number>/deletebill', methods=['GET', 'POST'])
def deletebill(invoice_number):
    # TODO: Complete delete bill route
    pass

@app.route('/bill/<invoice_number>/addproduct', methods=['GET', 'POST'])
def addproduct(invoice_number):
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
        return redirect(url_for('bill_details', invoice_number=invoice_number, savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive))
    return render_template('add_product.html', form=form, invoice_number=invoice_number, savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive)

@app.route('/base_js')
def base_js():
   return render_template('/Base_JS.js', savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive)

@app.route('/settings')
def settings():
    # Change this to actually implement settings with few variable to take care of.
    # 1. Label: Night Light:: Automatic/Manual (boolean: true/false):: variable: GlobalAutomaticNightLight
    # 2. Label: Night Mode :: Automatic/Manual (boolean: true/false):: variable: GlobalAutomaticNightMode
    # 3. Label: Time Format:: 12_hr/24_hr (boolean: true/false)     :: variable: format_12hr
    # 4. Label: Automatically hide SideBar after:: Seconds [1 - 9] (integer: 1-9):: variable: sideBarTimeout
    return render_template('/index.html', savedAutomaticDayNightMode=savedAutomaticDayNightMode, savedAutomaticNightLight=savedAutomaticNightLight, savedIsNightLightActive=savedIsNightLightActive, savedIsNightModeActive=savedIsNightModeActive)

@app.route('/save_state', methods=['POST'])
def save_state():
    content = request.get_json()
    savedAutomaticNightLight = int(content['data1'])
    savedAutomaticDayNightMode = int(content['data2'])
    savedIsNightLightActive = int(content['data3'])
    savedIsNightModeActive = int(content['data4'])
    return jsonify("")

if __name__ == "__main__":
    if not os.path.exists("billtrack/data.db"):
        os.system('flask db init')
        os.system('flask db migrate')
        os.system('flask db upgrade')
    app.run(debug=True)