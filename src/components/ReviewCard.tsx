import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native"
import { CloudImage } from "./CloudImage"
import { bookReviewInfo } from "../api/reviewApi"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"
import { Icon } from "@ant-design/react-native"
import dayjs from "dayjs"
import { API_URL } from "@env"
import Skeleton from "./Skeleton"
import { useAppSelector } from "../hook/useStore"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ReviewDetail">>

type propsInfo = {
    isReviewCard: boolean
    reviewInfo: bookReviewInfo
}

export const ReviewCard = ({ reviewInfo, isReviewCard }: propsInfo) => {
    const navigation = useNavigation<NavigateType>()
    const {
        userInfo: { fullName },
    } = useAppSelector((state) => state.mainSlice)

    const imageUrl = (url: string) => {
        if (url.indexOf("https") !== -1) {
            return url
        } else {
            return `${API_URL}public/get_resource?name=${url}`
        }
    }

    const ReChildComponent = () => {
        return reviewInfo ? (
            <>
                <View style={styles.headerReview}>
                    <CloudImage url={reviewInfo?.avatar} styleImg={styles.userAvatar} />
                    <Text style={[styles.userNameText, { color: fullName === reviewInfo.userName ? "#0A78D6" : "#6D7885" }]}>{reviewInfo?.userName}</Text>
                </View>
                <ImageBackground style={styles.bookWrapper} imageStyle={{ borderRadius: 12, objectFit: "cover" }} source={{ uri: imageUrl(reviewInfo.book.imageLink) }} blurRadius={30}>
                    <CloudImage styleImg={styles.bookImage} url={reviewInfo?.book.imageLink || ""} />
                    <View style={styles.bookInfo}>
                        <View>
                            <Text style={styles.bookTitleText}>{reviewInfo?.book.title}</Text>
                            <Text style={styles.bookDescrText}>{reviewInfo?.book.author}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="star" color="#0A78D6" size={13} style={{ marginTop: 2 }} />
                            <Text style={styles.rateNumberText}>{reviewInfo?.book.rating}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <Text style={[styles.bookDescrText, { marginTop: 10, marginLeft: 5 }]}>{dayjs(reviewInfo.createtime).format("DD MMMM YYYY [y].")}</Text>

                <View style={styles.reviewTitleBlock}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="star" color="#0A78D6" size-={15} />
                        <Text style={styles.reviewTitle}>{reviewInfo.rating}</Text>
                    </View>
                    <Text style={styles.reviewTitle}>{reviewInfo.message.trim()}</Text>
                </View>

                <View>
                    <Text style={[styles.bookDescrText, { lineHeight: 20 }]}>{reviewInfo.book.description}</Text>
                </View>
            </>
        ) : (
            <View>
                <View style={styles.headerReview}>
                    <Skeleton width={30} height={30} varient="circle" />
                    <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Skeleton width={1} height={200} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                    <View style={styles.reviewTitleBlock}>
                        <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                        <Skeleton width={100} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Skeleton width={1} height={400} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                </View>
            </View>
        )
    }

    return isReviewCard ? (
        <TouchableOpacity style={styles.reviewWrapper} delayPressIn={10} onPress={() => navigation.navigate("ReviewDetail", { id: reviewInfo.id || "" })}>
            <ReChildComponent />
        </TouchableOpacity>
    ) : (
        <ReChildComponent />
    )
}

const styles = StyleSheet.create({
    reviewTitle: {
        fontSize: 21,
        lineHeight: 25,
        fontWeight: "500",
        color: "#212121",
    },
    reviewTitleBlock: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    rateNumberText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#212121",
    },
    bookTitleText: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20,
        color: "#212121",
    },
    bookDescrText: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 16,
        color: "#6D7885",
    },
    bookInfo: {
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 10,
    },
    bookWrapper: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginTop: 10,
        wdith: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    bookImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        objectFit: "cover",
    },
    headerReview: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginTop: 20,
    },
    userAvatar: {
        width: 30,
        height: 30,
        objectFit: "cover",
        borderRadius: 100,
    },
    userNameText: {
        fontSize: 14,
        lineHeight: 16,
        color: "#6D7885",
    },

    reviewWrapper: {
        borderRadius: 9,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 1,
        marginTop: 1,
        marginHorizontal: 5,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 19,
        flexDirection: "row",
        gap: 14,
        alignItems: "flex-start",
    },

    bookReviewImg: {
        width: 84,
        height: 120,
        borderRadius: 9,
        objectFit: "cover",
    },
})
