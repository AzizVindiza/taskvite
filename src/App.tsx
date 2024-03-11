import React, { useState } from 'react';
import { Input, Button, Select } from 'antd';
import ProductListPage from './Pages/ProductListPage.tsx';
import ProductSearch from "./Pages/ProductSearch.tsx";
import { useGetFieldsQuery } from "./services/api.ts";

const { Search } = Input;
const { Option } = Select;

const App: React.FC = () => {
    const [searchText, setSearchText] = useState<number | string>("");
    const [searchCategory, setSearchCategory] = useState("product"); // Default search category
    const [searched, setSearched] = useState(false);
    const { data: { result: brands = [] } = {}, isLoading: brandsLoading } = useGetFieldsQuery({ field: 'brand', offset: 0, limit: 15 });


    const handleSearch = (value: string | number) => {
        setSearchText(value);
    };

    const handleSearchButtonClick = () => {
        setSearched(true);
    };

    const handleResetSearch = () => {
        setSearchText("");
        setSearched(false);
    };

    const handleCategoryChange = (value: string) => {
        setSearchCategory(value);
        setSearchText(""); // Reset searchText when category changes
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Поиск продуктов</h1>
            <div style={{ margin: "0 auto", maxWidth: 600, display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <Select defaultValue="product" style={{ width: 120, marginRight: "10px" }} onChange={handleCategoryChange}>
                    <Option value="product">Название</Option>
                    <Option value="price">Цена</Option>
                    <Option value="brand">Бренд</Option>
                </Select>
                {searchCategory !== "brand" ? (
                    <div style={{ flex: 1 }}>
                        {searchCategory === "price" ? (
                            <Search placeholder="Введите цену" onChange={e => handleSearch(parseFloat(e.target.value))} value={searchText as string} />
                        ) : (
                            <Search placeholder={`Введите ${searchCategory}`} onChange={e => handleSearch(e.target.value)} value={searchText as string} />
                        )}
                    </div>
                ) : (
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Выберите бренд"
                        optionFilterProp="children"
                        onChange={handleSearch}
                        value={searchText as string}
                        loading={brandsLoading}
                    >
                        {brands
                            .filter((brand, index, self) => self.indexOf(brand) === index) // Фильтрация уникальных значений
                            .map((brand, index) => (
                                <Option key={index} value={brand}>{brand}</Option>
                            ))}
                    </Select>
                )}
                <Button type="primary" onClick={handleSearchButtonClick} style={{ marginLeft: "10px" }}>Искать</Button>
            </div>
            {!searched ? (
                <ProductListPage />
            ) : (
                <ProductSearch object={{ [searchCategory]: searchText }} />
            )}
            {searched && <Button onClick={handleResetSearch}>Сбросить поиск</Button>}
        </div>
    );
};

export default App;
