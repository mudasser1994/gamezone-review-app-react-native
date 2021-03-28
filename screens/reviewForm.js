import React from "react";
import { Formik } from "formik";
import { View, TextInput, Button, Text } from "react-native";
import * as yup from "yup";
import { globalStyles } from "../styles/global";
import FlatButton from "../shared/button";

const reviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(4),
    body: yup.string()
        .required()
        .min(8),
    rating: yup.string()
        .required()
        .test("is-num-1-5" , "Rating must be a number", (val)=>{
            return parseInt(val) < 6 && parseInt(val) > 0;
        })
})

export default function ReviewForm({ addReview }) {
    return (
        <View styles={globalStyles.container}>
            <Formik initialValues={{ title: "", body: "", rating: "" }}
                validationSchema={reviewSchema}
                onSubmit={(values, { resetForm }) => {
                    addReview(values);
                    // resetForm();
                }}>
                {(props) => (
                    <View>
                        <TextInput
                            placeholder="Enter Review Title"
                            style={globalStyles.input}
                            onChangeText={props.handleChange("title")}
                            value={props.values.title}
                            onBlur={props.handleBlur("title")} />
                         <Text style={globalStyles.errorText}>{ props.touched.title && props.errors.title }</Text>

                        <TextInput
                            multiline
                            minHeight={60}
                            placeholder="Enter Review Body"
                            style={globalStyles.input}
                            onChangeText={props.handleChange("body")}
                            value={props.values.body}
                            onBlur={props.handleBlur("body")} />
                         <Text style={globalStyles.errorText}>{ props.touched.body && props.errors.body }</Text>

                        <TextInput
                            placeholder="Rating 1-5"
                            style={globalStyles.input}
                            onChangeText={props.handleChange("rating")}
                            value={props.values.rating}
                            keyboardType="numeric"
                            onBlur={props.handleBlur("rating")} />
                         <Text style={globalStyles.errorText}>{ props.touched.rating && props.errors.rating }</Text>
                         <FlatButton text="submit" onPress={props.handleSubmit} />
                        {/* <Button title="Submit" type="submit" color="maroon" onPress={props.handleSubmit} /> */}
                    </View>
                )}
            </Formik>
        </View>
    )
}