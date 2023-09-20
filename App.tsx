import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function App() {
  const [pass, setPass] = useState('')
  const [isPassGen, setisPassGen] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const PassSchema = Yup.object().shape(
    {
      passLength: Yup.number()
        .min(6, 'Minimum length must be 6')
        .max(12, 'Maximum length must be 12')
        .required('Password cannot be empty!')
    }
  )
  const genPassString = (passLength: number) => {
    let charList = ''
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*';
    if (uppercase) {
      charList += uppercaseChars
    }
    if (lowercase) {
      charList += lowercaseChars
    }
    if (numbers) {
      charList += digits
    }
    if (symbols) {
      charList += specialChars
    }

    const passResult = createPass(charList, passLength)
    setPass(passResult)
    setisPassGen(true)
  }
  const createPass = (chars: string, passLength: number) => {
    let result = ''
    for (let i = 0; i < passLength; i++) {
      const charIndex = Math.floor(Math.random() * chars.length)
      result += chars.charAt(charIndex)
    }
    return result
  }

  const resetPass = () => {
    setPass('')
    setSymbols(false)
    setLowercase(true)
    setUppercase(false)
    setisPassGen(false)
    setNumbers(false)

  }
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passLength: '' }}
            validationSchema={PassSchema}
            onSubmit={values => {
              console.log(values);
              genPassString(Number(values.passLength)) //TODO
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passLength && errors.passLength && (
                      <Text style={styles.errorText}>
                        {errors.passLength}
                      </Text>
                    )}
                  </View>
                  <TextInput style={styles.inputStyle} value={values.passLength} onChangeText={handleChange('passLength')} placeholder='Ex.8' keyboardType='numeric' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox disableBuiltInState isChecked={lowercase} onPress={() => setLowercase(!lowercase)} fillColor='#29AB87' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include uppercase</Text>
                  <BouncyCheckbox disableBuiltInState isChecked={uppercase} onPress={() => setUppercase(!uppercase)} fillColor='#29AB87' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include numbers</Text>
                  <BouncyCheckbox disableBuiltInState isChecked={numbers} onPress={() => setNumbers(!numbers)} fillColor='#29AB87' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include symbols</Text>
                  <BouncyCheckbox disableBuiltInState isChecked={symbols} onPress={() => setSymbols(!symbols)} fillColor='#29AB87' />
                </View>

                <View style={styles.formActions} >
                  <TouchableOpacity disabled={!isValid} style={styles.primaryBtn} onPress={handleSubmit} ><Text style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryBtn} onPress={() => { handleReset(); resetPass() }} ><Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGen ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result : </Text>
            <Text style={styles.description}>Long Press to Copy Password </Text>
            <Text selectable={true} style={styles.generatedPassword}>{pass}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
})