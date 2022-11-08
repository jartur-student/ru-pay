import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { Navigate } from "react-router-dom"
import Footer from "../components/footer"
import { useAuth } from "../components/auth_context"
import { getMeal, getMeals, Meal } from "../services/api/meal"
import { useEffect, useState } from "react"
import { getMealTypes, MealType } from "../services/api/meal_type"
import Container from "../components/container"

const Menu = () => {
  const { token } = useAuth()
  if (!token) {
    return <Navigate to="/login" />
  }

  const [meals, setMeals] = useState([] as Meal[])
  const [mealTypes, setMealTypes] = useState([] as MealType[])
  const [selectedMealType, setSelectedMealType] = useState(0)

  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const [date, setDate] = useState(d)

  useEffect(() => {
    getMealTypes().then(mealTypes => {
      setMealTypes(mealTypes)
      setSelectedMealType(mealTypes[0].id)
    })
    getMeals({ date: date.toISOString() }).then(meal => setMeals(meal))
  }, [date])

  const meal = meals.find(
    meal =>
      meal.mealTypeId === selectedMealType && meal.date === date.toISOString(),
  )

  return (
    <>
      <Container>
        <div className="flex">
          <img src="images/logo.png" alt="logo" className="ml-auto w-32 pb-5" />
          <img
            src="images/rupay.png"
            alt="rupay"
            className="ml-10 mr-auto my-auto w-64"
          />
        </div>
        <div className="flex w-full justify-center h-12">
          <button
            onClick={() => {
              const newDate = new Date(date)
              newDate.setDate(date.getDate() - 1)
              setDate(newDate)
            }}
            className="flex justify-center items-center bg-primary-default rounded-l-lg border-2 border-primary-dark w-12"
          >
            <FaAngleLeft className="text-white text-4xl" />
          </button>
          <h1 className="flex flex-grow text-2xl text-center items-center justify-center bg-primary-default border-y-2  border-primary-dark w-24">
            {date.toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </h1>
          <button
            onClick={() => {
              const newDate = new Date(date)
              newDate.setDate(date.getDate() + 1)
              setDate(newDate)
              console.log(date.toISOString())
            }}
            className="flex justify-center items-center bg-primary-default rounded-r-lg border-2 border-primary-dark w-12"
          >
            <FaAngleRight className="text-white text-4xl" />
          </button>
        </div>
        <div className="flex justify-center space-x-12 p-4">
          {mealTypes.map(curMealType => (
            <button
              onClick={() => setSelectedMealType(curMealType.id)}
              className={
                "py-1 px-2 text-2xl flex justify-center items-center  rounded border-2 border-primary-dark w-32 " +
                (curMealType.id === selectedMealType
                  ? "bg-primary-default"
                  : "")
              }
            >
              {curMealType.name.charAt(0).toUpperCase() +
                curMealType.name.slice(1)}
            </button>
          ))}
        </div>
        <div>
          <div className="flex justify-center">
            {meal ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b-primary-default border-b-4">
                    <th className="text-left text-2xl">Menu</th>
                    <th className="text-left text-2xl">Item</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(JSON.parse(meal.description)).map(
                    ([key, value]) => (
                      <tr
                        key={key}
                        className="border-b-primary-default border-b-2"
                      >
                        <td className="text-left text-2xl">{key}</td>
                        <td className="text-left text-2xl">
                          {value as string}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            ) : (
              <div>
                Ainda não temos uma entrada para o dia e a refeição solicitados.
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Menu
