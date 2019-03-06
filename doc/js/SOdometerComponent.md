# Attributes

Here's the list of available attribute(s).

## format

The format option allows you to configure how the digit groups are formatted, and how many digits are shown after the decimal point.
Format - Example
(,ddd) - 12,345,678
(,ddd).dd - 12,345,678.09
(.ddd),dd - 12.345.678,09
( ddd),dd - 12 345 678,09
d - 12345678

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **d**

## initialValue

Specify the initial value to transition from

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **null**

## values

Set the values to iterate over

Type : **{ Array<Number> }**

Default : **[]**

## timeout

Set the timeout between 2 numbers

Type : **{ Integer }**

Default : **null**

## loop

Specify if the odometer has to loop on the values or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**

## duration

Specify the duration of the number transitions in ms

Type : **{ Integer }**

Default : **3000**

# Methods

## next

Pass to the next value

## updateOdometer

Update the odometer to a new value

### Parameters

| Name  | Type                                                                                                   | Description                    | Status   | Default |
| ----- | ------------------------------------------------------------------------------------------------------ | ------------------------------ | -------- | ------- |
| value | **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }** | The new value for the odometer | required |
