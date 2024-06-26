import { Text, StyleSheet, View } from "react-native"
import { Page } from "../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"
import { SearchInput } from "../components/SearchInput"
import { useEffect, useState } from "react"
import { BookCard } from "../components/BookCard"
import { BookApi, bookInfo } from "../api/bookApi"
import { CarouselBookTypeFilter } from "../components/CarouselBookTypeFilter"
import { NoData } from "../components/NoData"
import { useAppSelector } from "../hook/useStore"
import { SelectGenres } from "../components/SelectGenres"
import Modal from "@ant-design/react-native/lib/modal"
import { GenreAPI } from "../api/genreApi"

export const Search = () => {
    const { categoryList } = useAppSelector((state) => state.mainSlice)
    const { fetchData: fetchBookData } = BookApi("list")
    const { fetchData: fetchGenreData } = GenreAPI("list")

    const [genreList, setGenreList] = useState<{ id: string; title: string }[]>([])

    const [search, setSearch] = useState<string>("")
    const [selectCategories, setSelectCategories] = useState<string[]>([])
    const [selectGenres, setSelectGenres] = useState<string[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [bookList, setBookList] = useState<bookInfo[]>([])

    useEffect(() => {
        fetchGenreData({}).then((res) => {
            if (res?.result_code === 0) {
                setGenreList(res.data)
            }
        })
    }, [])

    useEffect(() => {
        if (!search.length && !selectCategories.length && !selectGenres.length) {
            setBookList([])
            return
        }

        fetchBookData({
            title: search,
            filter: {
                genres: selectGenres,
                categories: selectCategories,
            },
        }).then((res) => {
            if (res?.result_code === 0) {
                setBookList(res.data)
            }
        })
    }, [search, JSON.stringify(selectCategories), JSON.stringify(selectGenres)])

    return (
        <Page>
            <Text style={styles.headText}>Search</Text>
            <SearchInput onEnterSearch={(e) => setSearch(e)} onClickFilter={() => setVisibleModal(true)} placeholder="Search books" />
            <View style={{ marginTop: 18 }}>
                <CarouselBookTypeFilter dataList={categoryList} handleBookType={(e) => (typeof e === "object" ? setSelectCategories(e) : null)} isMultiple={true} />
            </View>
            {!bookList.length ? (
                <View style={styles.searchBlock}>
                    <Icon name="search" style={styles.searchIcon} />
                    <Text style={styles.searchText}>Search books</Text>
                </View>
            ) : (
                <View style={styles.bookWrapper}>{bookList.length ? bookList.map((book, i) => <BookCard key={i} bookInfo={book} />) : <NoData />}</View>
            )}
            <Modal popup animationType="slide-up" visible={visibleModal} onClose={() => setVisibleModal(false)} style={styles.modalWrapper} maskClosable>
                <SelectGenres
                    onSelect={(e) => {
                        setVisibleModal(false)
                        setSelectGenres(e)
                    }}
                    dataList={genreList}
                    selectedGenres={selectGenres}
                />
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    modalWrapper: {
        paddingTop: 15,
        paddingHorizontal: 32,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    bookWrapper: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginVertical: 30,
    },
    headText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        opacity: 0.5,
        color: "#000000",
    },
    searchBlock: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    searchIcon: {
        fontSize: 82,
        color: "#BABABA",
    },
    searchText: {
        fontSize: 23,
        fontWeight: "500",
        lineHeight: 23,
        color: "#808080",
        marginTop: 13,
    },
})
