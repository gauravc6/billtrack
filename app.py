import os
from flask import render_template, redirect, url_for
from billtrack import app, db
from billtrack.models import Bill
from billtrack.forms import BillForm

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/allbills')
def allbills():
    bills = Bill.query.all()
    return render_template('allbills.html', bills=bills)

@app.route('/addbill', methods=['POST', 'GET'])
def addbill():
    form = BillForm()
    if form.validate_on_submit():
        bill = Bill(invoice_number=form.invoice_number.data,
                    supplier_name=form.supplier_name.data,
                    bill_total=form.bill_total.data,
                    bill_paid_status=form.bill_paid_status.data)
        db.session.add(bill)
        db.session.commit()
        return redirect(url_for('bill_details',invoice_number=form.invoice_number.data))
    return render_template('addbill.html', form=form)

@app.route('/<invoice_number>')
def bill_details(invoice_number):
    bill = Bill.query.filter_by(invoice_number=invoice_number).first_or_404()
    return render_template('bill_details.html', bill=bill)



if __name__ == "__main__":
    if not os.path.exists("billtrack/data.db"):
        os.system('flask db init')
        os.system('flask db migrate')
        os.system('flask db upgrade')
    app.run(debug=True)